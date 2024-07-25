<template>
    <div>
        <div @click="toggle">
            <slot name="head" :opened="opened"></slot>
        </div>
        <div ref="body" class="collapse_box" :style="bodyStyle">
            <slot name="body"></slot>
        </div>
    </div>
</template>


<script setup>
const opened = ref(false);
const body = ref();

const props = defineProps({
    disabled: Boolean,
    open: Boolean,
    custom: {
        type: Boolean,
        default: false
    }
})

const toggle = () => {
    emit('change', !opened.value)
    if (props.disabled || props.custom) return
    opened.value = !opened.value
}

watch(() => props?.open, (newVal) => {
    opened.value = newVal
}, { immediate: true })

const emit = defineEmits(['change'])
const bodyStyle = computed(() => {
    if (opened.value) {
        return {
            maxHeight: (body?.value?.scrollHeight || 0) + "px",
        };
    } else {
        return {
            maxHeight: 0,
        };
    }
});
</script>
<style scoped>
.collapse_box {
    overflow: hidden;
    transition: all 0.3s;
    max-height: 0px;
}
</style>