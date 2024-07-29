<template>
    <div class="content">
        <div class="flex justify-between items-center">
            <div>Employees</div>
            <div>
                <NuxtLink class="btn btn-add cursor-pointer" :to="localePath('/staff/employees/create')">Create Employee</NuxtLink>
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
const localePath = useLocalePath()
const userStore = useUserStore()
</script>