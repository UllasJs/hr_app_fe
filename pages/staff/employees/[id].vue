<template>
    <div class="content">
        <div class="flex justify-start items-center gap-5 my-6">
            <button @click="() => Button = 'one'" :class="{ 'bg-primary text-text-light': Button == 'one' }"
                class="btn border w-fit h-fit transition-all duration-200 px-2 py-1 flex gap-2 justify-start items-center">
                <span class="icon-dashboard texl-3xl"></span>
                <span v-if="Button == 'one'" :class="{ 'w-0': Button == 'two' }">{{ 'One' }}</span>
            </button>
            <button @click="() => Button = 'two'" :class="{ 'bg-primary text-text-light': Button == 'two' }"
                class="btn border w-fit h-fit transition-all duration-200 px-2 py-1 flex gap-2 justify-start items-center">
                <span class="icon-dashboard texl-3xl"></span>
                <span v-if="Button == 'two'" :class="{ 'w-0': Button == 'one' }">{{ 'Two' }}</span>
            </button>
        </div>
        {{ employData }}
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'app'
})
const { $get } = useNuxtApp()
const route = useRoute()
const employData = ref({})
const getEmployDetails = async () => {
    const res = await $get(`employ/get-employ-list/${route.params.id}`)
    employData.value = { ...res.data }
}
const Button = ref('one')
onActivated(() => {
    getEmployDetails();
})
</script>