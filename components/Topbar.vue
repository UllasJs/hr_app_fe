<template>
    <div class="h-[4.2rem] box-border transition-all duration-300 !bg-transparent flex fixed justify-center my-2 items-center"
        :class="{ 'right-0': !appStore.deviceData.isMobile, 'w-full pl-5': appStore.deviceData.isMobile, 'w-minus-280': appStore.sideBarOpen && !appStore.deviceData.isMobile, 'w-minus-60 pl-5': !appStore.sideBarOpen && !appStore.deviceData.isMobile }">
        <div class="flex h-[4rem] pr-5 flex-1 justify-between mr-5 items-center bg-content">
            <div class="pl-[20px]">
                <button class="btn btn-login !py-1" type="button" @click="changeLocale">{{ code }}</button>
            </div>
            <div class="flex items-center justify-center gap-4">
                <div class="font-semibold capitalize text-primary px-4 py-1 rounded-lg border border-primary">
                    {{ userStore.user.name }}
                </div>
                <!-- <button type="button" @click="ToggleDark">{{ isDark ? 'Light Mode' : 'Dark Mode' }}</button> -->
                <button type="button" @click="Logout" class="btn btn-logout !py-1">{{ $t('logout') }}</button>
            </div>
        </div>
    </div>
</template>

<script setup>
const userStore = useUserStore()
const appStore = useAppStore()
const router = useRouter()
const cookie = useCookie('isLoggedIn')
const switchLocale = useSwitchLocalePath()

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

let code = 'en-us'
const changeLocale = () => {
    if (code == 'en-us') {
        code = 'ar-ae'
        navigateTo(switchLocale(code))
    } else {
        code = 'en-us'
        navigateTo(switchLocale(code))
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

<style scoped>
.w-minus-280 {
    width: calc(100% - 250px);
}
.w-minus-60 {
    width: calc(100% - 60px);
}
</style>