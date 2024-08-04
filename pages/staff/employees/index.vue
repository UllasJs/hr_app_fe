<template>
    <div class="content">
        <div class="flex justify-between items-center">
            <div>Employees</div>
            <div>
                <NuxtLink class="btn btn-add cursor-pointer" :to="localePath('/staff/employees/create')">Create Employee
                </NuxtLink>
            </div>
        </div>
        <div class="box mt-5">
            Filter part
        </div>
        <div class="box mt-5">
            <RecordTable api="employ/get-employ-list" :payload="{}">
                <template #head>
                    <tr>
                        <th>{{ $t('employee_id') }}</th>
                        <th>{{ $t('name') }}</th>
                        <th>{{ $t('age') }}</th>
                        <th>{{ $t('nationality') }}</th>
                        <th>{{ $t('date_of_birth') }}</th>
                        <th>{{ $t('mobile_number') }}</th>
                        <th>{{ $t('registered') }}</th>
                        <th>{{ $t('action') }}</th>
                    </tr>
                </template>
                <template #body="{ rows }">
                    <tr v-for="r,i in rows" :key="i">
                        <td>{{ r.emp_id }}</td>
                        <td>{{ r.name }}</td>
                        <td>{{ r.age }}</td>
                        <td>{{ r.nationality }}</td>
                        <td>{{ r.dob }}</td>
                        <td>{{ r.mobile_num }}</td>
                        <td class="text-nowrap">{{ $fds(r.createdAt) }}</td>
                        <td>
                            <div>
                                <button type="button" @click="navigateTo(localePath(`/staff/employees/${r.emp_id}`))" class="icon-edit-btn"></button>
                            </div>
                        </td>
                    </tr>
                </template>
            </RecordTable>
        </div>
    </div>
</template>

<script setup>
const {$fds} = useNuxtApp()
useSeoMeta({
    title: 'Employees',
})
definePageMeta({
    layout: 'app',
    middleware: ['auth']
})
const localePath = useLocalePath()
const userStore = useUserStore()
</script>