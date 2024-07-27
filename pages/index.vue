<template>
    <div class="w-full min-h-screen flex justify-center items-center">
        <div class="w-full h-full md:max-w-[400px] md:max-h-[600px] md:border border-primary rounded-lg md:pb-8">
            <DForm @submit="login" novalidate>
                <div class="flex flex-col items-center mt-5 py-5 gap-4">
                    <h1 class="text-4xl font-black">LOGIN</h1>
                    <p class="text-headtext">Welcome back!</p>
                </div>
                <div class="w-full px-5 pb-3 space-y-4 md:px-10">
                    <div class="flex flex-col justify-start items-start space-y-1">
                        <span class="text-headtext font-medium capitalize">username</span>
                        <input class="o-input" type="text" placeholder="Username" v-model="username" />
                        <div class="mt-1">
                            <DError v-model="username" required :messages="usernameMessage" />
                        </div>
                    </div>
                    <div class="flex flex-col justify-start items-start space-y-1">
                        <span class="text-headtext font-medium capitalize">password</span>
                        <PasswordInput v-model="password" />
                        <div class="mt-1">
                            <DError v-model="password" required :messages="passwordMessage" />
                        </div>
                    </div>
                    <div class="flex justify-center items-center mt-5">
                        <button class="btn btn-login rounded-[30px]" type="submit">LOGIN</button>
                    </div>
                </div>
            </DForm>
        </div>
    </div>
</template>

<script setup>
const userStore = useUserStore()
const cookie = useCookie('userToken')
const username = ref('')
const router = useRouter()
const password = ref('')
const loggedIn = useCookie('isLoggedIn')

const usernameMessage = {
    required: 'Username is required',
}

const passwordMessage = {
    required: 'Password is required',
}

const login = async (e) => {
    if (!e.isValid) return
    const params = { username: username.value, password: password.value }
    const res = await userStore.Login(params)
    if (res.success) {
        cookie.value = res.token
        userStore.setLoggedIn(res.success)
        loggedIn.value = res.success
        sessionStorage.setItem('user', JSON.stringify(userStore.user))
        // refresh to change the token cookie cache issue
        router.replace('/dashboard').then(() => {
            window.location.reload();
        });
    } else {
        console.log('Login failed')
    }
}

onMounted(() => {
    if (loggedIn.value) {
        navigateTo('/dashboard', {
            replace: true
        })
    }
})

</script>