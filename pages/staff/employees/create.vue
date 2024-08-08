<template>
    <div class="content">
        <div class="flex justify-start flex-col mb-3">
            <div>
                <FIlePath :data="PathFile" />
            </div>
            <div>
                <h1 class="font-medium">{{ $t('register_an_employee') }}</h1>
            </div>
        </div>
        <DForm @submit="handleSubmit" novalidate>
            <div class="box mt-5 relative">
                <h3 class="box-heading">{{ $t('basic_details') }}</h3>
                <div class="w-full h-[6rem] my-3 flex justify-between gap-6">
                    <div class="space-y-1">
                        <div class="text-sm">{{ $t('employee_id') }}</div>
                        <input :placeholder="$t('enter_employee_id')" type="text" class="o-input" v-model="payload.emp_id" />
                        <div class="mt-1 !text-xs">
                            <DError v-model="payload.emp_id" required />
                        </div>
                    </div>
                    <PhotoInput label="profile_picture" />
                </div>
                <div class="input-group-sm">
                    <div class="space-y-1">
                        <div class="text-sm">{{ $t('first_name') }}</div>
                        <input type="text" :placeholder="$t('enter_first_name')" class="o-input" v-model="payload.first_name" />
                        <div class="mt-1 !text-xs">
                            <DError v-model="payload.first_name" required />
                        </div>
                    </div>
                    <div class="space-y-1">
                        <div class="text-sm">{{ $t('last_name') }}</div>
                        <input type="text" :placeholder="$t('enter_last_name')" class="o-input" v-model="payload.last_name" />
                        <div class="mt-1 !text-xs">
                            <DError v-model="payload.last_name" required />
                        </div>
                    </div>
                    <div class="space-y-1">
                        <div class="text-sm">{{ $t('date_of_birth') }}</div>
                        <DatePicker />
                        <div class="mt-1 !text-xs">
                            <DError v-model="payload.dob" required />
                        </div>
                    </div>
                </div>
            </div>
            <div class="my-5 flex justify-center gap-5 items-center">
                <button type="button" @click="() => navigateTo(localePath('/staff/employees'))" class="btn">{{
                    $t('cancel') }}</button>
                <button class="btn btn-add">{{ $t('register') }}</button>
            </div>
        </DForm>
    </div>
</template>

<script setup>
const { t } = useI18n();
const localePath = useLocalePath();
const { $post } = useNuxtApp()
const appStore = useAppStore()
const PathFile = [
    {
        slug: 'employees',
        link: '/staff/employees'
    },
    {
        slug: 'create_employee',
    }
]
useSeoMeta({
    title: 'Add Employee',
})
definePageMeta({
    layout: 'app',
    auth: ['auth']
})
const defaultPayload = {
    emp_id: '',
    name: '',
    age: '',
    nationality: '',
    home_country: '',
    dob: '',
    mobile_num: '',
}

const payload = reactive({ ...defaultPayload })

const handleSubmit = async (e) => {
    if (!e.isValid) return
    const res = await $post('employ/add-employ', { ...payload })
    console.log(res)
}

watch(() => payload.visa_expiry, (v) => {
    if (v) {
        const expiryDate = new Date(payload.visa_expiry);
        const currentDate = new Date();
        const timeDiff = expiryDate - currentDate;
        const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // convert milliseconds to days
        payload.visa_days_left = daysLeft >= 0 ? daysLeft : 0; // Set to 0 if negative
    }
});

const yearList = computed(() => {
    const startYear = new Date().getFullYear() - 15
    const endYear = new Date().getFullYear() + 15
    let list = []
    for (let y = startYear; y <= endYear; y++) {
        list.push({
            text: y,
            value: y
        })
    }
    return list
})

const getExpiryDays = (date) => {
    const expiryDate = new Date(date);
    const currentDate = new Date();
    const timeDiff = expiryDate - currentDate;
    const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // convert milliseconds to days
    return daysLeft >= 0 ? daysLeft : 0;
}

// onActivated(() => {
//     appStore.sideBarOpen = false;
// })

// onDeactivated(() => {
//     appStore.sideBarOpen = true
// })

</script>
