import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => {
    return {
      sideBarOpen: false,
      sidebarbtn: {
        name: "",
      },
      deviceData: {
        innerWidth: 0,
        isMobile: false,
      },
      ready: false,
    };
  },
  actions: {
    updateDeviceWidth(width) {
      this.deviceData.innerWidth = width;
      this.deviceData.isMobile = width < 768;
      if (this.deviceData.isMobile) {
        this.sideBarOpen = false;
      } else {
        this.sideBarOpen = true;
      }
    },
    toggleSidebarItem(slug) {
      this.sidebarbtn.name = slug;
    },
  },
});
