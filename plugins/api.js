import axios from "axios";

export default defineNuxtPlugin((nuxtApp) => {
  const isLoggedIn = useCookie("isLoggedIn");
  const token = useCookie("userToken");
  const config = useRuntimeConfig();

  const handleError = (error) => {
    if (error.response) {
      // Log the error response data
      console.log(error.response.data);

      // Session expired logic
      if (error.response.data && !error.response.data.success) {
        alert("Session Expired!");
        isLoggedIn.value = false;
        token.value = "";
        navigateTo("/", {
          replace: true,
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
    return null;
  };

  const get = async (route, params) => {
    try {
      const response = await axios.get(`${config.public.API_DOMAIN}/${route}`, {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
        params: params,
      },
    );
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  };

  const post = async (route, params) => {
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
