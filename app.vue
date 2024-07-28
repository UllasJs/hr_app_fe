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

let root = null
let sizeTimer = null;
const syncHeight = () => {
  if (sizeTimer) {
    clearTimeout(sizeTimer);
    sizeTimer = null;
  }
  sizeTimer = setTimeout(() => {
    root.style.setProperty('--window-height', `${window.innerHeight - 1}px`);
    clearTimeout(sizeTimer);
    sizeTimer = null;
  }, 150)
}
onMounted(() => {
  nextTick(() => {
    root = document.documentElement;
    window.addEventListener('resize', syncHeight);
    syncHeight()
  })
})

</script>

<style>
/* Add your styles here if needed */
</style>
