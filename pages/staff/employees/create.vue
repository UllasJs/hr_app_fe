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
                        <input type="text" class="o-input" v-model="payload.air_home_country" />
                    </div>
                    <div class="space-y-2">
                        <div>{{ $t('date_of_birth') }}</div>
                        <input type="date" class="o-input uppercase" v-model="payload.dob" />
                    </div>
                    <div class="space-y-2">
                        <div>{{ $t('uae_mobile_no') }}</div>
                        <input type="number" class="o-input o-number" v-model="payload.uae_mob_no" />
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
                        <div>{{ $t('current_basic_salary') }}</div>
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
                        <div>{{ $t('hard_ship') }}</div>
                        <input type="text" v-model="payload.hard_ship" class="o-input" />
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
            <div class="box my-5">
                <div>
                    <h1 class="text-xl py-1 font-bold">{{ $t('visa_and_other_details') }}</h1>
                </div>
                <hr />
                <div class="input-group-sm py-3 capitalize">
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
useSeoMeta({
    title: 'Add Employee',
})
definePageMeta({
    layout: 'app',
    auth: ['auth']
})
const defaultPayload = {
    name: '',
    age: '',
    nationality: '',
    air_home_country: '',
    dob: '',
    uae_mob_no: '',
    home_mobileno: '',
    designation: '',
    date_of_join: '',
    cur_basic_sal: '',
    cur_status: 'active',
    hard_ship: '',
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
    total_salary: ''
}

const payload = reactive({ ...defaultPayload })

const handleSubmit = () => {
    console.log(payload)
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

const getExpiryDays = (date) => {
    const expiryDate = new Date(date);
    const currentDate = new Date();
    const timeDiff = expiryDate - currentDate;
    const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // convert milliseconds to days
    return daysLeft >= 0 ? daysLeft : 0;
}

</script>