<template>
    <div class="content">
        Pay
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'app',
    middleware: ['auth']
})
const userStore = useUserStore()
</script>