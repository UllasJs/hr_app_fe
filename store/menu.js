import { defineStore } from "pinia";
export const useMenuStore = defineStore("menu", {
  state: () => {
    return {
      data: {
        dashboard: {
          slug: "dashboard",
          link: "/dashboard",
          id: 1,
          permissions: [],
        },
        personnel: [
          {
            slug: "admin management",
            sub_links: [
              {
                slug: "admin",
                link: "/admins/admin",
                id: 2,
                permissions: [],
              },
              {
                slug: "roles",
                link: "/admins/roles",
                id: 3,
                permissions: [],
              }
            ],
          },
          {
            slug: "employee management",
            sub_links: [
              {
                slug: "employees",
                link: "/staff/employees",
                id: 4,
                permissions: [],
              },
              {
                slug: "head staff",
                link: "/staff/head-staff",
                id: 5,
                permissions: [],
              }
            ],
          }
        ],
      },
      linkMap: null, // will be populated with init() in action
    };
  },
  actions: {
    init() {
      if (this.linkMap) {
        // already init
        return;
      }
      let map = {};
      const menuEntries = Object.values(this.data);
      for (let i = 0; i < menuEntries.length; i++) {
        if (Array.isArray(menuEntries[i])) {
          for (let j = 0; j < menuEntries[i].length; j++) {
            if (Array.isArray(menuEntries[i][j].sub_links)) {
              for (let k = 0; k < menuEntries[i][j].sub_links.length; k++) {
                map[menuEntries[i][j].sub_links[k].link] =
                  menuEntries[i][j].sub_links[k];
              }
            } else if (menuEntries[i][j].link) {
              map[menuEntries[i][j].link] = menuEntries[i][j];
            }
          }
        } else if (typeof menuEntries[i] == "object") {
          if (Array.isArray(menuEntries[i].sub_links)) {
            for (let k = 0; k < menuEntries[i].sub_links.length; k++) {
              map[menuEntries[i].sub_links[k].link] =
                menuEntries[i].sub_links[k];
            }
          } else if (menuEntries[i].link) {
            map[menuEntries[i].link] = menuEntries[i];
          }
        }
      }
      this.linkMap = map;
    },
  },
});
