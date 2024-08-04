<template>
    <div class="fixed min-h-screen shadow-md z-[999] bg-content transition-all duration-300"
        :class="{ 'w-[230px]': open, 'w-[60px]': !open && !appStore.deviceData.isMobile, 'w-[0px]': !open && appStore.deviceData.isMobile }">
        <div class="flex justify-between items-center h-[5.5rem] px-3">
            <div class="overflow-hidden font-black text-lg whitespace-nowrap" :class="{ 'w-0': !open }">
                {{ $t('hr_management') }}
            </div>
            <div>
                <button @click="appStore.sideBarOpen = !appStore.sideBarOpen" class="transition-all duration-300"
                    :class="{ 'rotate-180': !open, 'ml-4': !open && appStore.deviceData.isMobile }">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 24 24">
                        <path fill="var(--primary)"
                            d="M21 18v2H3v-2zM6.596 3.903L8.01 5.318L4.828 8.5l3.182 3.182l-1.414 1.414L2 8.5zM21 11v2h-9v-2zm0-7v2h-9V4z" />
                    </svg>
                </button>
            </div>
        </div>
        <div>
            <div class="overflow-auto light-scrollbar max-h-[800px] h-[calc(100vh-100px)]">
                <div v-for="(category, name) in menuStore.data" class="sidebar-item-container">
                    <template v-if="Array.isArray(category)">
                        <div class="text-secondary font-bold text-lg leading-tight tracking-widest py-3 px-4 uppercase mt-4 side-title"
                            v-if="open">{{ $t(name)
                            }}
                        </div>
                        <div class="side-content">
                            <SideBarItem v-for="m in category" :data="m" :key="m" class="side-content-item" />
                        </div>
                    </template>
                    <template v-else-if="typeof category == 'object'">
                        <SideBarItem :data="category" />
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const { t } = useI18n()
const userStore = useUserStore()
const appStore = useAppStore()
const menuStore = useMenuStore()
const open = ref(false)


watch(() => appStore.sideBarOpen, (v) => {
    open.value = v
}, { immediate: true })
</script>