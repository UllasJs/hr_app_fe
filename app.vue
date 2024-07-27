<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
const appStore = useAppStore();
const userStore = useUserStore();
onMounted(async () => {
  const userData = sessionStorage.getItem('user')
  const user = JSON.parse(userData);
  if (user) {
    userStore.setUser(user?.name, user?.id)
  }
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
