export default defineNuxtRouteMiddleware(async (to, from) => {
  const isLoggedIn = useCookie('isLoggedIn');
  const token = useCookie('userToken')
  if (!isLoggedIn.value) {
    token.value = ''
    return navigateTo(`/`);
  }
});
