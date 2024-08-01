<template>
    <div class="h-[4.2rem] bg-body flex sticky top-0 left-0 justify-center my-2 items-center">
        <div class="flex h-[4rem] px-5 justify-between items-center w-[98%] bg-primary rounded-lg shadow-md">
            <div>
            </div>
            <div class="flex items-center justify-center gap-4">
                <div class="font-semibold capitalize text-text-light px-4 py-2 rounded-lg border border-text-light">
                    {{ userStore.user.name }}
                </div>
                <!-- <button type="button" @click="ToggleDark">{{ isDark ? 'Light Mode' : 'Dark Mode' }}</button> -->
                <button type="button" @click="Logout" class="btn btn-logout">{{ $t('logout') }}</button>
            </div>
        </div>
    </div>
</template>

<script setup>
const userStore = useUserStore()
const appStore = useAppStore()
const router = useRouter()
const cookie = useCookie('isLoggedIn')

const Logout = () => {
    cookie.value = false
    userStore.setLoggedIn(false)
    sessionStorage.clear()
    router.push('/')
    userStore.setUser({})
    console.log('User logged out')
}

const isDark = ref(false);

const ToggleDark = () => {
    isDark.value = !isDark.value;
    if (isDark.value) {
        document.body.classList.add('darkmode');
        localStorage.setItem('isDark', 'true');
    } else {
        document.body.classList.remove('darkmode');
        localStorage.setItem('isDark', 'false');
    }
}


onMounted(() => {
    const v = localStorage.getItem('isDark');
    if (JSON.parse(v)) {
        document.body.classList.add('darkmode');
        isDark.value = true;
    } else {
        document.body.classList.remove('darkmode');
        isDark.value = false;
    }
})
</script>