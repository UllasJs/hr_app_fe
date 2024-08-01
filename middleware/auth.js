export default defineNuxtRouteMiddleware(async (to, from) => {
  const isLoggedIn = useCookie('isLoggedIn');
  const localePath = useLocalePath();
  const token = useCookie('userToken');

  if (!isLoggedIn.value) {
    token.value = null;
    if (to.path !== localePath('/')) {
      return navigateTo(localePath('/'));
    }
  } else {
    if (to.path === localePath('/')) {
      console.log('object')
      // Redirect to dashboard if trying to access the home page while logged in
      return navigateTo(localePath('/dashboard'));
    }
  }
});

