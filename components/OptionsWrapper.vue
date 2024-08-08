<template>
    <Teleport to="body">
        <div :class="isMobile ? 'o-select-backdrop' : 'o-select-dropdown'" v-if="open" ref="optionsWrapper">
            <div class="o-select-content" ref="content" :class="wrapperClass">
                <slot></slot>
            </div>
        </div>
    </Teleport>
</template>

<script setup>
const props = defineProps({
    open: Boolean,
    width: Number,
    el: [HTMLElement, undefined],
    wrapperClass: String
})
const isMobile = ref(false)
watch(() => props.open, (isOpened) => {
    if (isOpened) {
        isMobile.value = window.innerWidth < 768
        document.addEventListener('click', closeCheck)
        window.addEventListener('resize', reizeHandler)
        nextTick(() => {
            if (window.innerWidth >= 768) {
                posDropdown()
                posDropdown() // somehow need to run posDropdown twice, or the dropdown position will be a little off
                hideOnPageScroll()
            }
        })
    }
    else { // when dropdown is closed
        document.removeEventListener('click', closeCheck)
        window.removeEventListener('resize', reizeHandler)
        destroyPageScrollEvent()
    }
})


const content = ref(null)
const emit = defineEmits(['close'])
const closeCheck = (e) => {
    if (!props.open || !props.el) return
    if (!props.el.contains(e.target) && !content.value.contains(e.target)) {
        emit('close')
    }
}
const reizeHandler = () => {
    posDropdown()
}
const optionsWrapper = ref(null)
const posDropdown = () => {
    if (isMobile.value || !optionsWrapper.value) return
    const selectRect = props.el.getBoundingClientRect()
    const optionsRect = optionsWrapper.value.getBoundingClientRect()
    const optionsWidth = props.width || selectRect.width
    const newStyle = {
        position: 'absolute',
        width: `${optionsWidth}px`
    }

    if (selectRect.x + optionsWidth < document.body.scrollWidth) { // have space on right
        newStyle.left = `${selectRect.left}px`
    } else {
        newStyle.right = `${document.body.scrollWidth - selectRect.right}px`
    }

    if (selectRect.bottom + optionsRect.height < window.innerHeight || selectRect.y - optionsRect.height < 0) { // have space on bottom
        newStyle.top = `${selectRect.bottom + window.scrollY}px`
    } else {
        newStyle.top = `${selectRect.y + window.scrollY - optionsRect.height}px`
    }

    /* if (props.minWidth) {
        optionsWrapper.value.style.minWidth = `${props.minWidth}px`
    } */

    Object.assign(optionsWrapper.value.style, newStyle)
}

onBeforeUnmount(() => {
    document.removeEventListener('click', closeCheck)
    window.removeEventListener('resize', reizeHandler)
    destroyPageScrollEvent()
})

let scrollableAncestors = []
const getScrollableAncestors = (el, scrollableElementGroup = []) => {
    if (el != window.document.body) {
        const elParent = el.parentElement
        if (!elParent) {
            return scrollableElementGroup
        }
        if (elParent.scrollHeight > elParent.clientHeight) {
            scrollableElementGroup.push(elParent)
        }
        return getScrollableAncestors(elParent, scrollableElementGroup)
    }
    if (el.scrollHeight > el.clientHeight) {
        scrollableElementGroup.push(el)
    }
    scrollableElementGroup.push(window)
    return scrollableElementGroup
}

const closeDropdown = () => {
    emit('close')
}

const hideOnPageScroll = () => {
    if (!props.el) return
    scrollableAncestors = getScrollableAncestors(props.el)
    scrollableAncestors.forEach(a => {
        a.addEventListener('scroll', closeDropdown)
    })
}

const destroyPageScrollEvent = () => {
    scrollableAncestors.forEach(a => {
        a.removeEventListener('scroll', closeDropdown)
    })
}
</script>

<style scoped>
.o-select-backdrop {
    position: fixed;
    z-index: 1050;
    animation: fadeIn 0.1s;
    background-color: #00000088;
    width: 100%;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    overflow: hidden;
    height: var(--window-height);
}

.o-select-content {
    background-color: var(--box-body);
    transition: all 0.1s;
    max-height: 50vh;
    display: flex;
    flex-direction: column;
    overflow: auto;
}

.o-select-dropdown {
    /* background-color: var(--o-dropdown-bg); */
    border-radius: 5px;
    z-index: 1050;
    max-height: 50vh;
    overflow: hidden;
    /* animation: fadeIn 0.1s; */
}

.o-select-backdrop .o-select-content {
    min-height: 60vh;
}

@media (max-width: 767px) {
    .o-select-content {
        border-radius: 0;
        padding-bottom: 20px;
        /* offset url bar in ios */
        animation: slideUp 0.3s;
        max-height: var(--window-height);
    }
}

@keyframes fadeIn {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

@keyframes slideUp {
    0% {
        transform: translateY(60px);
    }

    100% {
        transform: translateY(0);
    }
}
</style>