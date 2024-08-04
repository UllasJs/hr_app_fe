<template>
    <div class="flex justify-between items-center">
        <div class="text-sm">
            Showing {{ pagination.from || '0' }} - {{ pagination.to || '0' }} of {{ pagination.total || '0' }} items
        </div>
        <div class="flex justify-center items-center">
            <div class="flex justify-center items-center" @click="prevPage()">
                <button class="icon-arrow-left text-3xl" :disabled="modelValue == 1"></button>
            </div>
            <div class="mr-1"
                v-if="(!showParticularFirstPage && pagination.last_page > 4) || pagination.last_page == 4 && props.modelValue > 2"
                @click="updatePage(1)"><button class="page-btn-num" type="button">1</button>
            </div>
            <div class="mr-1" v-if="loading"><button class="page-btn-num bg-primary text-white" type="button">{{ props.modelValue }}</button>
            </div>
            <div v-if="!hidedecrementPageByTwo && pagination.last_page"> 4" class="px-2"><button type="button"
                    class="btn !text-[#848E9C] !p-2" @click="decrementPageByTwo">...</button></div>
            <div class="space-x-1" v-for="(num, index) in pagination.last_page" :key="index" @click="updatePage(num)">
                <button class="page-btn-num"
                    v-if="props.modelValue - 1 == num || props.modelValue == num || props.modelValue + 1 == num || showPreviousNumber == num || showLastNumber == num"
                    type="button" :class="{ 'bg-primary text-white': num == props.modelValue }">{{ num }}</button>
            </div>
            <div v-if="!hideincrementPageByTwo && pagination.last_page > 4">
                <button type="button" @click="incrementPageByTwo">...</button>
            </div>
            <div class="ml-1">
                <button class="page-btn-num" @click="updatePage(pagination.last_page)"
                    v-if="(!showParticularLastPage && pagination.last_page > 4) || pagination.last_page == 4 && props.modelValue < 3">{{
                        pagination.last_page || '0' }}</button>
            </div>
            <div class="flex justify-center items-center" @click="nextPage()">
                <button class="icon-arrow-right text-3xl" :disabled="modelValue == pagination.last_page"></button>
            </div>
        </div>
    </div>
</template>

<script setup>
import Modal from './Modal.vue';

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
    modelValue: Number,
    pagination: Object,
    loading: Boolean
})
const currentPage = ref(1)

const updatePage = (page) => {
    emit('update:modelValue', page)
}

const hideincrementPageByTwo = computed(() => {
    return (props.modelValue >= props.pagination.last_page - 2)
})

const hidedecrementPageByTwo = computed(() => {
    return props.modelValue < 4
})

const showParticularLastPage = computed(() => {
    return props.modelValue > props.pagination.last_page - 2
})

const showParticularFirstPage = computed(() => {
    return props.modelValue < 3
})
const nextPage = () => {
    if (props.modelValue < props.pagination.last_page) emit('update:modelValue', props.modelValue + 1)
}
const prevPage = () => {
    if (props.modelValue > 1) emit('update:modelValue', props.modelValue - 1)
}
const incrementPageByTwo = () => {
    if (props.modelValue >= 1 && props.modelValue < props.pagination.last_page && props.modelValue != props.pagination.last_page - 1) emit('update:modelValue', props.modelValue + 2)
}
const decrementPageByTwo = () => {
    if (props.modelValue <= props.pagination.last_page && props.modelValue > 1 && props.modelValue != 2) emit('update:modelValue', props.modelValue - 2)
}

const showLastNumber = computed(() => {
    if (props.modelValue == 1) {
        return props.modelValue + 2
    }
})
const showPreviousNumber = computed(() => {
    if (props.modelValue == props.pagination.last_page) {
        return props.modelValue - 2
    }
})

</script>

<style scoped>
.page-btn-num {
    padding: 0.2rem 0.5rem;
    text-align: center;
    border-radius: 5px;
    cursor: pointer;
    border: 1px solid transparent;
    transition: all 0.3s ease;
}
</style>