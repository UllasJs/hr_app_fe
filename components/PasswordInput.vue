<template>
    <div class="w-full">
        <input :type="type" class="o-input" @input="handleInput" :class="Class" v-model="value" :placeholder="hint" />
    </div>
</template>

<script setup>
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
    modelValue: {
        type: String
    },
    Class: String,
    hint: {
        type: String,
        default: 'Password'
    }
})

const handleInput = (e) => {
    emit('update:modelValue', e.target.value)
}

const value = ref(props.modelValue)
const type = ref('password')

</script>