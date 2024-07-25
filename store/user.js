import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      user: { id: null, name: null },
      isLoggedIn: false,
      token: null,
    };
  },
  actions: {
    setUser(name, id) {
      this.user = { id: id, name: name };
    },
    async Login(params) {
      const { $post } = useNuxtApp();
      const res = await $post("admin/login", params);
      this.isLoggedIn = res.success;
      if (res.success) {
        localStorage.setItem('user', JSON.stringify(res.data));
        this.setUser(res.data.user, res.data.id);
      }
      return {
        success: res.success,
        message: res.message,
        token: res.data?.token,
      };
    },
    setLoggedIn(bool) {
      this.isLoggedIn = bool;
    },
  },
});
