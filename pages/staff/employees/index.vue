<template>
    <div class="content">
        <div class="flex justify-between items-center">
            <div>Employees</div>
            <div>
                <NuxtLink class="btn btn-add" to="employees/create">Add</NuxtLink>
            </div>
        </div>
        <div class="box mt-5">
            Filter part
        </div>
    </div>
</template>

<script setup>
useSeoMeta({
    title: 'Employees',
})
definePageMeta({
    layout: 'app',
    middleware: ['auth']
})
const userStore = useUserStore()
</script>