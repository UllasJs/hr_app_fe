<template>
    <div class="parent">
        <template v-if="data.link">
            <NuxtLink :to="localePath(data.link)"
                class="head capitalize border-transparent text-primaryText px-3 py-1.5 transition-all duration-300 flex items-center gap-3 my-2 mx-2"
                :class="{ 'router-link-active': checkRoute(data.link) }">
                <div class="flex justify-center items-center text-lg">
                    <span :class="`icon-${data.icon}`"></span>
                </div>
                <div class="overflow-hidden text-sm" :class="{ 'w-0': !open, 'w-fit': open }">
                    <span>{{ $t(data.slug) }}</span>
                </div>
            </NuxtLink>
        </template>
        <template v-else-if="data.sub_links">
            <div>
                <Collapse @change="onCollapseToggle" :custom="true" :open="appStore?.sidebarbtn?.name === data.slug"
                    :disabled="!open">
                    <template #head="collapseHeadData">
                        <div @mouseenter="handleOver" class="menu-btn mt-2 mx-2" ref="menuEl">
                            <button
                                class="flex justify-between overflow-hidden items-center text-primaryText head py-2 transition-all w-full">
                                <div class="pl-5 ps-3 flex-grow flex capitalize text-nowrap items-center gap-3">
                                    <span v-show="open">{{ $t(data.slug) }}</span>
                                </div>
                                <div v-if="appStore.sideBarOpen" class="pr-3 flex-shrink-0">
                                    <div class="rotate-[270deg] transition-all duration-300"
                                        :class="{ 'rotate-[360deg]': collapseHeadData.opened }">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12"
                                            fill="currentColor" viewBox="0 0 16 16">
                                            <path
                                                d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                                        </svg>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </template>
                    <template #body>
                        <template v-for="s in data.sub_links" :key="s.link">
                            <div class="px-2">
                                <NuxtLink :to="localePath(s.link)"
                                    class="link border border-transparent capitalize px-3 py-1 items-center transition-all flex gap-3 my-1 mx-2">
                                    <span class="bullet-icon"
                                        :class="{ 'router-link-active': checkRoute(s.link) }"></span>
                                    <span>{{ $t(s.slug) }}</span>
                                </NuxtLink>
                            </div>
                        </template>
                    </template>
                </Collapse>
            </div>
        </template>
    </div>
</template>

<script setup>
const route = useRoute()
const { t } = useI18n()
const appStore = useAppStore()
const localePath = useLocalePath()
const props = defineProps({
    data: {
        type: Object
    }
})

const handleOver = (e) => {
    posDropdown();
};

const onCollapseToggle = () => {
    if (appStore.sidebarbtn.name !== props.data.slug) {
        appStore.toggleSidebarItem(props.data.slug);
    } else {
        appStore.toggleSidebarItem("");
    }
    nextTick(() => {
        posDropdown();
    });
};

const open = computed(() => {
    return appStore.sideBarOpen
});

const menuEl = ref();
const posDropdown = () => {
    const menuElRect = menuEl.value.getBoundingClientRect();
    const subLinksEl = menuEl.value.querySelector(".hover-menu");
    const innerHeight = window.innerHeight;
    const sublinksDown = innerHeight - menuElRect.top;
    const popUpLimit = innerHeight / 2;
    if (subLinksEl && sublinksDown > popUpLimit) {
        subLinksEl.style.top = `${menuElRect.y + window.scrollY}px`;
        subLinksEl.style.left = `${menuElRect.width + 12}px`;
    } else if (subLinksEl && sublinksDown <= popUpLimit) {
        subLinksEl.style.top = `${menuElRect.y - subLinksEl.clientHeight + 34}px`;
        subLinksEl.style.left = `${menuElRect.width + 12}px`;
    }
};

const checkRoute = (tabLink) => {
    const routeSegments = route.path.split('/');
    const linkSegments = tabLink.split('/');
    let flag = false
    if (linkSegments[2] == routeSegments[3] && linkSegments[1] == routeSegments[2]) {
        if (linkSegments.length > 3) {
            if (linkSegments[3] == routeSegments[4]) {
                flag = true
            } else {
                flag = false
            }
        } else {
            flag = true
        }
    } else {
        flag = false
    }
    return flag
}
</script>

<style scoped>
.router-link-active {
    color: var(--text-light);
    border-radius: 6px;
    box-shadow: 1px 1px 10px var(--secondary);
    background-color: var(--primary);
}

.head {
    display: flex;
    border: 1px solid transparent;
    font-weight: 500;
    color: var(--text-dark);
    align-items: center;
    border-radius: 6px;
}

.router-link-active .head {
    color: var(--primary);
    font-weight: 500;
    border-radius: 4px;
    background: var(--primary-light);
}

.parent:has(.router-link-active) .head {
    color: var(--text-light);
    display: flex;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
    background: var(--primary);
    align-items: center;
}

.link:hover {
    color: var(--text-dark);
    border: 1px solid var(--primary);
    border-radius: 6px;
}

.link .bullet-icon {
    display: block;
    width: 10px;
    height: 10px;
    background: var(--text-light);
    border: 1px solid var(--secondary);
    border-radius: 50%;
}

.link:hover .bullet-icon {
    /* border: 1px solid var(--text-hover); */
    /* background-color: var(--text-hover); */
}

.head:hover {
    color: var(--text-head);
    font-weight: 500;
    background: var(--primary-light);
}
</style>