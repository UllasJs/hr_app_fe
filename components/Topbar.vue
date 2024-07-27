<template>
    <div class="w-full h-[4.2rem] bg-primary pr-5 flex fixed top-0 left-0 justify-between items-center">
        <div></div>
        <div>
            {{ userStore.user.name }}
        </div>
    </div>
</template>

<script setup>
const userStore = useUserStore()
const appStore = useAppStore()
</script>