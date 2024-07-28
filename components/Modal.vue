<template>
    <Teleport to="body">
        <div class="fmodal-overlay" :class="{ show: show }">
            <div class="fmodal-wrapper" @click="closeModal" ref="wrapper">
                <div class="fmodal-content light-scrollbar relative p-4 sm:p-6 rounded-[5px] w-full shadow-lg"
                    :class="containerClass" :style="{ maxWidth: `${maxWidth}px` }">
                    <slot />

                </div>
            </div>
        </div>
    </Teleport>
</template>

<script setup>
const props = defineProps({
    show: Boolean,
    showFilter: Boolean,
    clickClose: Boolean,
    containerClass: String,
    maxWidth: {
        type: Number,
        default: 600
    }
})

const emit = defineEmits(['close'])

const wrapper = ref()
const closeModal = (e) => {
    if (props.clickClose && e.target == wrapper.value) {
        emit('close')
    }
}

const detectClose = (e) => {
    if (e.key == 'Escape') {
        emit('close')
    }
}
</script>


<style scoped>
.fmodal-overlay {
    height: var(--window-height);
    position: fixed;
    background-color: rgba(0, 0, 0, 0.3);
    width: 100vw;
    top: 0;
    left: 0;
    z-index: 1050;
    overflow: hidden;
    visibility: hidden;
    opacity: 0;
    transition: all 0.3s;
    backdrop-filter: blur(5px);
}

.fmodal-wrapper {
    position: relative;
    padding: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    overflow-y: hidden;
}

.fmodal-overlay.show {
    visibility: visible;
    opacity: 1;
}

.fmodal-content {
    overflow-y: auto;
    background-color: var(--body);
    max-height: 100%;
    transition: all 0.1s;
    transform: translateY(70px);
}

.fmodal-overlay.show .fmodal-content {
    transform: translateY(0);

}

@media screen and (max-width: 767px) {
    .fmodal-wrapper {
        padding: 0;
        align-items: flex-end;
    }

    .fmodal-content {
        max-width: 100% !important;
    }
}
</style>