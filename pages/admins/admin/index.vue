<template>
    <div class="content">
        <div>
            <button class="btn !w-fit btn-login" @click="refresh++">refresh</button>
        </div>
        <div class="box">
            <RecordTable api="admin/get-users" :key="refresh" :payload="{}">
                <template #head>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </template>
                <template #body="{ rows }">
                    <tr v-for="(r, i) in rows" :key="i">
                        <td>{{ r.username }}</td>
                        <td>{{ r.email }}</td>
                        <td>{{ r.role }}</td>
                        <td>
                            <button class="btn border mx-auto w-fit p-1 rounded-md flex items-center justify-center">
                                <span class="icon-edit-btn"></span>
                            </button>
                        </td>
                    </tr>
                </template>
            </RecordTable>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'app',
    middleware: ['auth']
})
const refresh = ref(0)
const userStore = useUserStore()
</script>