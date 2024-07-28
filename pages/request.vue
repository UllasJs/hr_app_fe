<template>
    <div class="content">
        Request
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'app',
    middleware: ['auth']
})
const userStore = useUserStore()
</script>