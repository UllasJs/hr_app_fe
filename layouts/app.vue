<template>
    <div class="flex max-h-screen overflow-hidden">
        <Sidebar />
        <div @click="appStore.sideBarOpen = false" v-if="appStore.deviceData.isMobile && appStore.sideBarOpen" class="absolute z-[888] w-full h-screen blur-md bg-[#0001a]"></div>
        <div class="max-h-full flex flex-col max-w-full grow overflow-y-auto transition-all duration-300 relative"
            :class="{ 'ml-[260px]': appStore.sideBarOpen && !appStore.deviceData.isMobile, 'ml-[60px]': !appStore.sideBarOpen && !appStore.deviceData.isMobile }">
            <Topbar />
            <div class="w-full flex flex-col  overflow-x-hidden grow">
                <slot />
            </div>
        </div>
    </div>
</template>

<script setup>
const appStore = useAppStore()
</script>