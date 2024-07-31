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
                        <input type="text" class="o-input" v-model="payload.airportHomeCountry" />
                    </div>
                    <div class="space-y-2">
                        <div>{{ $t('date_of_birth') }}</div>
                        <input type="date" class="o-input uppercase" v-model="payload.dateOfBirth" />
                    </div>
                    <div class="space-y-2">
                        <div>{{ $t('uae_mobile_no') }}</div>
                        <input type="number" class="o-input o-number" v-model="payload.uaemobileNo" />
                    </div>
                    <div class="space-y-2">
                        <div>{{ $t('home_country_no') }}</div>
                        <input type="number" class="o-input o-input" v-model="payload.homeCountryNo" />
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
                        <input type="date" class="o-input uppercase" v-model="payload.dateOfJoining" />
                    </div>
                    <div class="space-y-2">
                        <div>{{ $t('current_basic_salary') }}</div>
                        <input type="text" class="o-input" v-model="payload.currentBasicSalary" />
                    </div>
                    <div class="space-y-2">
                        <div>{{$t('current_status')}}</div>
                        <select name="status" class="o-input" v-model="payload.currentStatus">
                            <option value="on-going">On Going</option>
                            <option value="active" selected>Active</option>
                            <option value="inactive">In Active</option>
                        </select>
                    </div>
                    <div class="space-y-2">
                        <div>{{ $t('hard_ship') }}</div>
                        <input type="text" v-model="payload.hardShip" class="o-input" />
                    </div>
                    <div class="space-y-2">
                        <div>{{ $t('date_of_resign') }}</div>
                        <input type="date" class="o-input uppercase" v-model="payload.dateOfResign" />
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
                        <input type="text" class="o-input" v-model="payload.bankName" />
                    </div>
                    <div class="space-y-2">
                        <div>{{ $t('account_number') }}</div>
                        <input type="text" class="o-input" v-model="payload.accNum" />
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
                <div class="input-group-xl py-3 capitalize">
                    <div class="space-y-2">
                        <div>{{ $t('eid_no') }}</div>
                        <input type="text" class="o-input" v-model="payload.eid_no" />
                    </div>
                    <div class="space-y-2">
                        <div>{{ $t('account_number') }}</div>
                        <input type="text" class="o-input" v-model="payload.accNum" />
                    </div>
                    <div class="space-y-2">
                        <div>{{ $t('IBAN') }}</div>
                        <input type="text" class="o-input" v-model="payload.iban" />
                    </div>
                </div>
            </div>
            <div class="my-5 flex justify-center gap-5 items-center">
                <button type="button" @click="()=>navigateTo(localePath('/staff/employees'))" class="btn">{{ $t('cancel') }}</button>
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
    airportHomeCountry: '',
    dateOfBirth: '',
    uaemobileNo: '',
    homeCountryNo: '',
    designation: '',
    dateOfJoining: '',
    currentBasicSalary: '',
    currentStatus: 'active',
    hardShip: '',
    dateOfResign: '',
    bankName: '',
    accNum: '',
}

const payload = reactive({ ...defaultPayload })

const handleSubmit = () => {
    console.log(payload)
}

</script>