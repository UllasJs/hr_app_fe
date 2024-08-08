<template>
    <div @click="handleFileUpload" class="h-[100px] overflow-hidden relative rounded-md w-fit max-w-[80px] text-center border border-primary">
        <input type="file" ref="fileInput" class="opacity-0" @change="handleChange" :accept="accept" style="display: block;" />
        <div class="absolute z-[6] bg-white rounded-sm flex justify-center items-center w-full bottom-0 text-center opacity-80 !text-xs">
            <span>{{ $t(label) }}</span>
        </div>
        <div class="absolute z-[5] top-[50%] left-[50%] w-[120px] translate-x-[-50%] translate-y-[-50%]">
            <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="">
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    label: String,
    defaultImage: [String, Object],
    accept: {
        type: String,
        default: 'image/*'
    },
})

const fileInput = ref()

const handleFileUpload = () => {
    fileInput.value.click()
}

const handleChange = (e) => {
    console.log(e.target.files[0])
}
</script>