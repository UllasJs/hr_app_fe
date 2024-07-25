<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
const appStore = useAppStore();

onMounted(async () => {
  nextTick(() => {
    appStore.updateDeviceWidth(window.innerWidth)
    window.addEventListener("resize", () => {
      appStore.updateDeviceWidth(window.innerWidth)
    })
  })
})

</script>

<style>
/* Add your styles here if needed */
</style>
