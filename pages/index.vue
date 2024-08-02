<template>
    <div class="w-full min-h-screen flex justify-center items-center md:bg-body">
        <div
            class="w-full h-full md:max-w-[400px] md:max-h-[600px] md:border border-primary rounded-lg md:pb-8 bg-box-body">
            <DForm @submit="login" novalidate>
                <div class="flex flex-col items-center mt-5 py-5 gap-4">
                    <h1 class="text-4xl font-black uppercase">{{ $t('login') }}</h1>
                    <p class="text-headtext">{{ $t('welcome_back') }}!</p>
                </div>
                <div class="w-full px-5 pb-3 space-y-4 md:px-10">
                    <div class="flex flex-col justify-start items-start space-y-1">
                        <span class="text-headtext font-medium capitalize">{{ $t('username') }}</span>
                        <input class="o-input" type="text" :placeholder="$t('please_enter_username')"
                            v-model="username" />
                        <div class="mt-1">
                            <DError v-model="username" required :messages="usernameMessage" />
                        </div>
                    </div>
                    <div class="flex flex-col justify-start items-start space-y-1">
                        <span class="text-headtext font-medium capitalize">{{ $t('password') }}</span>
                        <PasswordInput v-model="password" :hint="$t('please_enter_password')" />
                        <div class="mt-1">
                            <DError v-model="password" required :messages="passwordMessage" />
                        </div>
                    </div>
                    <div class="flex justify-center items-center mt-5">
                        <button :disabled="loading" class="btn btn-login relative" type="submit">
                            <span v-if="loading"
                                class="three-dot-spinner absolute !w-[2rem] !h-[2rem] top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]"></span>
                            <span :class="{ 'opacity-0': loading }">{{ $t('login') }}</span>
                        </button>
                    </div>
                </div>
            </DForm>
        </div>
    </div>
</template>

<script setup>

definePageMeta({
    middleware: ['auth']
})

const userStore = useUserStore()
const localePath = useLocalePath()
const cookie = useCookie('userToken')
const username = ref('')
const router = useRouter()
const password = ref('')
const loggedIn = useCookie('isLoggedIn')
const loading = ref(false)

const usernameMessage = {
    required: 'Username is required',
}

const passwordMessage = {
    required: 'Password is required',
}

const login = async (e) => {
    if (!e.isValid) return
    let params = { username: username.value, password: password.value }
    loading.value = true;
    const res = await userStore.Login(params)
    if (res.success) {
        loading.value = false
        cookie.value = res.token
        userStore.setLoggedIn(res.success)
        loggedIn.value = res.success
        sessionStorage.setItem('user', JSON.stringify(userStore.user))
        // refresh to change the token cookie cache issue
        router.replace("/").then(() => {
            window.location.reload();
        });
    } else {
        loading.value = false
        console.log('Login failed')
    }
}

onMounted(() => {
    if (loggedIn.value) {
        navigateTo(localePath('/dashboard'))
    }
})

</script>