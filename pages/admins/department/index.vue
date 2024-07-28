<template>
    <div class="content">
        Department
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'app',
    middleware: ['auth']
})
const userStore = useUserStore()
</script>