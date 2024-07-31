export const useApi = () => {
  const { $get } = useNuxtApp();
  const additional = ref({});
  const loading = ref(false);

  const pages = ref([]);
  const rowPage = ref([])
  const page = ref(1);

  const getList = async (api, params) => {
    loading.value = true;
    page.value = params.page;
    if (pages.value[params.page - 1]) {
      loading.value = false;
      return;
    };
    const res = await $get(api, params);
    if (res?.success) {
      pages.value[params.page - 1] = res.data;
      rowPage.value[params.page - 1] = res?.pagination;
      additional.value = res?.additional || {};
    }
    loading.value = false;
    return res;
  };

  const pagination = computed(() => {
    if (rowPage.value[page.value - 1]) {
      return rowPage.value[page.value - 1];
    }
    return {};
  })

  const rows = computed(() => {
    if (pages.value[page.value - 1]) {
      return pages.value[page.value - 1];
    }
    return [];
  });

  return {
    rows,
    additional,
    pagination,
    getList, // function
    loading,
  };
};
