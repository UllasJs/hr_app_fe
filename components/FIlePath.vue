<template>
    <div class="flex justify-start gap-1">
        <div class="flex justify-center items-center text-xs" v-for="(p, i) in data">
            <span class="link_hover" v-if="p.link" @click="() => navigateTo(localePath(p.link))">{{ $t(p.slug) }}</span>
            <span class="text-gray-500" v-else>{{ $t(p.slug) }}</span>
            <span class="text-xl" v-if="i < data.length - 1">/</span>
        </div>
    </div>
</template>

<script setup>
const localePath = useLocalePath()
const props = defineProps({
    data: Array,
})

</script>

<style scoped>
.link_hover {
    position: relative;
    cursor: pointer;
    padding: 2px;
    color: var(--primary);
}
.link_hover::before {
    content: '';
    width: 0%;
    height: 1.5px;
    background: var(--primary);
    position: absolute;
    bottom: 0;
    left: 0;
    transition: all 300ms;
}
.link_hover:hover::before {
    width: 100%;
}
</style>