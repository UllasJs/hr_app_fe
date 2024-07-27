<script setup>
const props = defineProps({
  api: {
    type: String,
    required: true,
  },
  payload: {
    type: Object,
    required: true,
  }
})
const { rows, additional, pagination, getList, loading } = useApi();

const page = ref(1)
const paginate = ref(10)

watch(() => page.value, (v) => {
  getList(props.api, { ...props.payload, page: v, paginate: paginate.value })
})

onMounted(async () => {
  getList(props.api, { ...props.payload, page: page.value, paginate: paginate.value })
})
</script>

<template>
  <div class="overflow-x-auto">
    <div>
      <ExportButton />
    </div>
    <table class="main-table mt-4">
      <thead v-if="loading">
        <tr v-for="r in 10">
          <th v-for="v in 5" class="py-3 !bg-transparent h-[2rem]">
            <div class="table-skeleton"></div>
          </th>
        </tr>
      </thead>
      <thead v-if="!loading && rows.length > 0">
        <slot name="head" />
      </thead>
      <tbody v-if="!loading && rows.length > 0">
        <slot name="body" :rows="rows" :additional="additional" :paginate="paginate" />
      </tbody>
    </table>
    <div class="mt-4" v-if="pagination">
      <Pagination :pagination="pagination" v-model="page" />
    </div>
  </div>
</template>

<style scoped></style>