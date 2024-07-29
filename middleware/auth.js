export default defineNuxtRouteMiddleware(async (to, from) => {
  const isLoggedIn = useCookie('isLoggedIn');
  const localePath = useLocalePath()
  const token = useCookie('userToken')
  if (!isLoggedIn.value) {
    token.value = ''
    return navigateTo(localePath('/'));
  }
});
