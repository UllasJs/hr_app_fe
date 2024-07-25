<template>
    <div class="content">
        Employees
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'app',
    middleware: ['auth']
})
const userStore = useUserStore()
</script>