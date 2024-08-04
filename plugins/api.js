import axios from "axios";

export default defineNuxtPlugin((nuxtApp) => {
  const isLoggedIn = useCookie("isLoggedIn");
  const config = useRuntimeConfig();
  const router = useRouter();
  const localePath = useLocalePath();

  const handleError = (error) => {
    const token = useCookie("userToken");
    if (error.response) {
      if (error.response.status === 401) {
        alert("Session Expired!");
        token.value = null;
        isLoggedIn.value = false;
        router.replace("/").then(() => {
          window.location.reload();
        });
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.log("No response received:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error:", error.message);
    }
    // Optional: return a default value or throw the error to be handled by the caller
    return error.response?.data;

  };

  const get = async (route, params) => {
    const token = useCookie("userToken");
    try {
      const response = await axios.get(`${config.public.API_DOMAIN}/${route}`, {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
        params,
      });
      return response.data;
    } catch (error) {
      handleError(error);
    }
  };

  const post = async (route, params) => {
    const token = useCookie("userToken");
    try {
      const response = await axios.post(
        `${config.public.API_DOMAIN}/${route}`,
        params,
        {
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  };

  return {
    provide: {
      get,
      post,
    },
  };
});
