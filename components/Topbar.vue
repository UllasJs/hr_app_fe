<template>
    <div class="w-full h-[4.2rem] bg-white pr-5 flex fixed top-0 left-0 justify-between items-center">
        <div></div>
        <div class="flex justify-center items-center gap-4">
            <div>
                {{ userStore.user.name }}
            </div>
            <button type="button" @click="Logout" class="btn btn-login">logout</button>
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

</script>