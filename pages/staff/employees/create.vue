<template>
    <div class="content">
        <div class="flex justify-between items-center">
            <div>
                <h1 class="text-xl">{{ $t('register_an_employee') }}</h1>
            </div>
        </div>
        <DForm @submit="handleSubmit" novalidate>
            <div class="box mt-5">
                <div>
                    <h1 class="text-xl py-1 font-bold">{{ $t('basic_details') }}</h1>
                </div>
                <hr />
                <div class="input-group-xl py-3 capitalize">
                    <div class="space-y-2">
                        <div>{{ $t('employee_id') }}</div>
                        <input type="text" class="o-input" v-model="payload.emp_id" />
                    </div>
                    <div class="space-y-2">
                        <div>{{ $t('name') }}</div>
                        <input type="text" class="o-input" v-model="payload.name" />
                    </div>
                    <div class="space-y-2">
                        <div>{{ $t('age') }}</div>
                        <input type="number" class="o-input o-number" v-model="payload.age" />
                    </div>
                    <div class="space-y-2">
                        <div>{{ $t('nationality') }}</div>
                        <input type="text" class="o-input" v-model="payload.nationality" />
                    </div>
                    <div class="space-y-2">
                        <div>{{ $t('airport_home_country') }}</div>
                        <input type="text" class="o-input" v-model="payload.home_country" />
                    </div>
                    <div class="space-y-2">
                        <div>{{ $t('date_of_birth') }}</div>
                        <input type="date" class="o-input uppercase" v-model="payload.dob" />
                    </div>
                    <div class="space-y-2">
                        <div>{{ $t('mobile_number') }}</div>
                        <input type="number" class="o-input o-number" v-model="payload.mobile_num" />
                    </div>
                    <div class="space-y-2">
                        <div>{{ $t('home_country_no') }}</div>
                        <input type="number" class="o-input o-input" v-model="payload.home_mobileno" />
                    </div>
                </div>
            </div>
            <div class="box mt-5">
                <div>
                    <h1 class="text-xl py-1 font-bold">{{ $t('salary_and_designation_details') }}</h1>
                </div>
                <hr />
                <div class="input-group-xl py-3 capitalize">
                    <div class="space-y-2">
                        <div>{{ $t('designation') }}</div>
                        <input type="text" class="o-input" v-model="payload.designation" />
                    </div>
                    <div class="space-y-2">
                        <div>{{ $t('date_of_joining') }}</div>
                        <input type="date" class="o-input uppercase" v-model="payload.date_of_join" />
                    </div>
                    <div class="space-y-2">
                        <div>{{ $t('basic_salary') }}</div>
                        <input type="text" class="o-input" v-model="payload.cur_basic_sal" />
                    </div>
                    <div class="space-y-2">
                        <div>{{ $t('current_status') }}</div>
                        <select name="status" class="o-input" v-model="payload.cur_status">
                            <option value="on-going">On Going</option>
                            <option value="active" selected>Active</option>
                            <option value="inactive">In Active</option>
                        </select>
                    </div>
                    <div class="space-y-2">
                        <div>{{ $t('allowance') }}</div>
                        <input type="text" v-model="payload.allowance" class="o-input" />
                    </div>
                    <div class="space-y-2">
                        <div>{{ $t('date_of_resign') }}</div>
                        <input type="date" class="o-input uppercase" v-model="payload.date_of_resign" />
                    </div>
                    <div class="space-y-2">
                        <div>{{ $t('total_salary') }}</div>
                        <input type="number" class="o-input o-number" v-model="payload.total_salary" />
                    </div>
                    <div class="space-y-2">
                        <div>{{ $t('overtime') }}</div>
                        <input type="number" class="o-input o-number" v-model="payload.overtime" />
                    </div>
                    <div class="space-y-2">
                        <div>{{ $t('h_overtime') }}</div>
                        <input type="number" class="o-input o-number" v-model="payload.h_overtime" />
                    </div>
                </div>
            </div>
            <div class="box my-5">
                <div>
                    <h1 class="text-xl py-1 font-bold">{{ $t('bank_details') }}</h1>
                </div>
                <hr />
                <div class="input-group-xl py-3 capitalize">
                    <div class="space-y-2">
                        <div>{{ $t('bank_name') }}</div>
                        <input type="text" class="o-input" v-model="payload.bank_name" />
                    </div>
                    <div class="space-y-2">
                        <div>{{ $t('account_number') }}</div>
                        <input type="text" class="o-input" v-model="payload.account_no" />
                    </div>
                    <div class="space-y-2">
                        <div>{{ $t('IBAN') }}</div>
                        <input type="text" class="o-input" v-model="payload.iban" />
                    </div>
                </div>
            </div>
            <!-- <div class="box my-5">
                <div>
                    <h1 class="text-xl py-1 font-bold">{{ $t('visa_and_other_details') }}</h1>
                </div>
                <hr />
                <div class="input-group-xl py-3 capitalize">
                    <div class="space-y-2">
                        <div>{{ $t('eid_no') }}</div>
                        <input type="text" class="o-input" v-model="payload.eid_no" />
                    </div>
                    <div class="space-y-2">
                        <div class="flex justify-start items-center gap-3">{{ $t('eid_no_expiry_date') }} <span
                                class="text-sm text-text-gray">({{ getExpiryDays(payload.eid_expiry) || '-' }}) {{
                                    $t('days_left')
                                }}</span></div>
                        <input type="date" class="o-input uppercase" v-model="payload.eid_expiry" />
                    </div>
                    <div class="space-y-2">
                        <div>{{ $t('labour_card_no') }}</div>
                        <input type="text" class="o-input" v-model="payload.labour_card_no" />
                    </div>
                    <div class="space-y-2">
                        <div class="flex justify-start items-center gap-3">{{ $t('labour_card_no_expiry_date') }} <span
                                class="text-sm text-text-gray">({{ getExpiryDays(payload.labour_card_expiry) || '-' }})
                                {{ $t('days_left')
                                }}</span></div>
                        <input type="date" class="o-input uppercase" v-model="payload.labour_card_expiry" />
                    </div>
                    <div class="space-y-2">
                        <div>{{ $t('visa_type') }}</div>
                        <select v-model="payload.visa_type" class="o-input">
                            <option value="vip">{{ $t('vip') }}</option>
                            <option value="standard">{{ $t('standard') }}</option>
                        </select>
                    </div>
                    <div class="space-y-2">
                        <div>{{ $t('designation_as_per_VISA') }}</div>
                        <input type="text" class="o-input" v-model="payload.visa_designation" />
                    </div>
                    <div class="space-y-2">
                        <div class="flex justify-start gap-3 items-center">{{ $t('visa_expiry_date') }} <span
                                class="text-sm text-text-gray">({{ getExpiryDays(payload.visa_expiry) || '-' }}) {{
                                    $t('days_left')
                                }}</span></div>
                        <input type="date" class="o-input uppercase" v-model="payload.visa_expiry" />
                    </div>
                    <div class="space-y-2">
                        <div>{{ $t('passport_number') }}</div>
                        <input type="number" class="o-input uppercase" v-model="payload.passport_no" />
                    </div>
                    <div class="space-y-2">
                        <div class="flex justify-start gap-3 items-center">{{ $t('passport_expiry') }} <span
                                class="text-sm text-text-gray">({{ getExpiryDays(payload.passport_expiry) || '-' }}) {{
                                    $t('days_left')
                                }}</span></div>
                        <input type="date" class="o-input uppercase" v-model="payload.passport_expiry" />
                    </div>
                </div>
            </div>
            <div class="box my-5">
                <div>
                    <h1 class="text-xl py-1 font-bold">{{ $t('employee_insurance_details') }}</h1>
                </div>
                <hr />
                <div class="input-group-xl py-3 capitalize">
                    <div class="space-y-2">
                        <div>{{ $t('unemployment_insurance') }}</div>
                        <input type="text" class="o-input" v-model="payload.unemployment_insurance" />
                    </div>
                    <div class="space-y-2">
                        <div class="flex justify-start items-center gap-3">{{ $t('unemployment_insurance_expiry') }}
                            <span class="text-sm text-text-gray">({{
                                getExpiryDays(payload.unemployment_insurance_expiry) || '-' }}) {{
                                    $t('days_left')
                                }}</span></div>
                        <input type="date" class="o-input uppercase" v-model="payload.unemployment_insurance_expiry" />
                    </div>
                    <div class="space-y-2">
                        <div>{{ $t('health_insurance') }}</div>
                        <input type="text" class="o-input" v-model="payload.health_insurance" />
                    </div>
                    <div class="space-y-2">
                        <div class="flex justify-start items-center gap-3">{{ $t('health_insurance_expiry') }} <span
                                class="text-sm text-text-gray">({{ getExpiryDays(payload.health_insurance_expiry) || '-'
                                }}) {{
                                    $t('days_left')
                                }}</span></div>
                        <input type="date" class="o-input uppercase" v-model="payload.health_insurance_expiry" />
                    </div>
                    <div class="space-y-2">
                        <div>{{ $t('workman_insurance') }}</div>
                        <input type="text" class="o-input" v-model="payload.workman_insurance" />
                    </div>
                    <div class="space-y-2">
                        <div class="flex justify-start items-center gap-3">{{ $t('workman_insurance_expiry') }} <span
                                class="text-sm text-text-gray">({{ getExpiryDays(payload.workman_insurance_expiry) ||
                                '-' }}) {{
                                    $t('days_left')
                                }}</span></div>
                        <input type="date" class="o-input uppercase" v-model="payload.workman_insurance_expiry" />
                    </div>
                </div>
            </div>
            <div class="box my-5">
                <div>
                    <h1 class="text-xl py-1 font-bold">{{ $t('annual_leave_salary_details') }}</h1>
                </div>
                <hr />
                <div class="input-group-xl py-3 capitalize">
                    <div class="space-y-2">
                        <div>{{ $t('basic_salary_current_year') }}</div>
                        <select v-model="payload.b_s_cur_year" class="o-input">
                            <option v-for="y in yearList" :value="y.text">{{ y.value }}</option>
                        </select>
                    </div>
                    <div class="space-y-2">
                        <div>{{ $t('basic_salary') }}</div>
                        <input type="text" class="o-input" v-model="payload.basic_salary" />
                    </div>
                    <div class="space-y-2">
                        <div class="flex justify-start items-center gap-3">{{ $t('health_insurance_expiry') }} <span
                                class="text-sm text-text-gray">({{ getExpiryDays(payload.health_insurance_expiry) || '-'
                                }}) {{
                                    $t('days_left')
                                }}</span></div>
                        <input type="date" class="o-input uppercase" v-model="payload.health_insurance_expiry" />
                    </div>
                    <div class="space-y-2">
                        <div>{{ $t('workman_insurance') }}</div>
                        <input type="text" class="o-input" v-model="payload.workman_insurance" />
                    </div>
                    <div class="space-y-2">
                        <div class="flex justify-start items-center gap-3">{{ $t('workman_insurance_expiry') }} <span
                                class="text-sm text-text-gray">({{ getExpiryDays(payload.workman_insurance_expiry) ||
                                '-' }}) {{
                                    $t('days_left')
                                }}</span></div>
                        <input type="date" class="o-input uppercase" v-model="payload.workman_insurance_expiry" />
                    </div>
                    <div class="space-y-2">
                        <div>{{ $t('current_year_leave_salary') }}</div>
                        <input type="text" class="o-input" v-model="payload.c_y_leave_sal" />
                    </div>
                    <div class="space-y-2">
                        <div>{{ $t('paid') }}</div>
                        <input type="text" class="o-input" v-model="payload.paid" />
                    </div>
                    <div class="space-y-2">
                        <div>{{ $t('deduction') }}</div>
                        <input type="text" class="o-input" v-model="payload.deduction" />
                    </div>
                    <div class="space-y-2">
                        <div>{{ $t('balance_to_paid') }}</div>
                        <input type="text" class="o-input" v-model="payload.balance_to_paid" />
                    </div>
                    <div class="space-y-2">
                        <div>{{ $t('reason') }}</div>
                        <input type="text" class="o-input" v-model="payload.reason" />
                    </div>
                    <div class="space-y-2">
                        <div>{{ $t('total') }}</div>
                        <input type="text" class="o-input" v-model="payload.total" />
                    </div>
                </div>
            </div> -->
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
    home_mobileno: '',
    designation: '',
    date_of_join: '',
    cur_basic_sal: '',
    cur_status: 'active',
    allowance: '',
    date_of_resign: '',
    bank_name: '',
    account_no: '',
    eid_expiry: '',
    iban: '',
    labour_card_no: '',
    labour_card_expiry: '',
    visa_type: '',
    visa_designation: '',
    visa_expiry: '',
    passport_no: '',
    passport_expiry: '',
    total_salary: '',
    unemployment_insurance: '',
    unemployment_insurance_expiry: '',
    health_insurance: '',
    health_insurance_expiry: '',
    b_s_cur_year: new Date().getFullYear(),
    workman_insurance: '',
    workman_insurance_expiry: '',
    c_y_leave_sal: '',
    paid: '',
    deduction: '',
    balance_to_paid: '',
    reason: '',
    total: ''
}

const payload = reactive({ ...defaultPayload })

const handleSubmit = async (e) => {
    if (!e.isValid) return
    const res = await $post('employ/add-employ', {...payload})
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

</script>