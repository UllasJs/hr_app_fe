<template>
    <div class="content">
        <div class="flex justify-between items-center">
            <div>
                <h1 class="text-xl">Register an Employee</h1>
            </div>
            <div>
                <button type="button" @click="createBoxModal = true" class="btn btn-add">Create Box</button>
            </div>
        </div>
        <div class="box mt-5">
            <div class="input-group-xl">
                <div class="space-y-2">
                    <div>Name</div>
                    <input type="text" class="o-input" />
                </div>
            </div>
        </div>
        <Modal :show="createBoxModal" clickClose @close="createBoxModal = false">
            test
        </Modal>
    </div>
</template>

<script setup>
useSeoMeta({
    title: 'Add Employee',
})
definePageMeta({
    layout: 'app',
    auth: ['auth']
})
const createBoxModal = ref(false) 
</script>