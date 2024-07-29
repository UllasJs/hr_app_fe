<template>
    <div class="content">
        <div class="flex justify-between items-center">
            <div>
                <h1 class="text-xl">Register an Employee</h1>
            </div>
        </div>
        <DForm @submit="handleSubmit" novalidate>
            <div class="box mt-5">
                <div>
                    <h1 class="text-xl py-1 font-bold">Basic Details</h1>
                </div>
                <hr />
                <div class="input-group-xl py-3 capitalize">
                    <div class="space-y-2">
                        <div>Name</div>
                        <input type="text" class="o-input" v-model="payload.name" />
                    </div>
                    <div class="space-y-2">
                        <div>Age</div>
                        <input type="number" class="o-input o-number" v-model="payload.age" />
                    </div>
                    <div class="space-y-2">
                        <div>Nationality</div>
                        <input type="text" class="o-input" v-model="payload.nationality" />
                    </div>
                    <div class="space-y-2">
                        <div>Airport Home Country</div>
                        <input type="text" class="o-input" v-model="payload.airportHomeCountry" />
                    </div>
                    <div class="space-y-2">
                        <div>Date of Birth</div>
                        <input type="date" class="o-input uppercase" v-model="payload.dateOfBirth" />
                    </div>
                    <div class="space-y-2">
                        <div>UAE Mobile No</div>
                        <input type="number" class="o-input o-number" v-model="payload.uaemobileNo" />
                    </div>
                    <div class="space-y-2">
                        <div>Home Country No</div>
                        <input type="number" class="o-input o-input" v-model="payload.homeCountryNo" />
                    </div>
                </div>
            </div>
            <div class="box mt-5">
                <div>
                    <h1 class="text-xl py-1 font-bold">Salary and Designation Details</h1>
                </div>
                <hr />
                <div class="input-group-xl py-3 capitalize">
                    <div class="space-y-2">
                        <div>Designation</div>
                        <input type="text" class="o-input" v-model="payload.designation" />
                    </div>
                    <div class="space-y-2">
                        <div>Date of Joining</div>
                        <input type="date" class="o-input uppercase" v-model="payload.dateOfJoining" />
                    </div>
                    <div class="space-y-2">
                        <div>Current Basic Salary</div>
                        <input type="text" class="o-input" v-model="payload.currentBasicSalary" />
                    </div>
                    <div class="space-y-2">
                        <div>Current Status</div>
                        <select name="status" class="o-input" v-model="payload.currentStatus">
                            <option value="on-going">On Going</option>
                            <option value="active" selected>Active</option>
                            <option value="inactive">In Active</option>
                        </select>
                    </div>
                    <div class="space-y-2">
                        <div>Hard Ship</div>
                        <input type="text" v-model="payload.hardShip" class="o-input" />
                    </div>
                    <div class="space-y-2">
                        <div>Date of Resign</div>
                        <input type="date" class="o-input uppercase" v-model="payload.dateOfResign" />
                    </div>
                </div>
            </div>
            <div class="box my-5">
                <div>
                    <h1 class="text-xl py-1 font-bold">Bank Details</h1>
                </div>
                <div class="input-group-xl">
                    <div class="space-y-2">
                        <div>Bank Name</div>
                        <input type="text" class="o-input" v-model="payload.bankName" />
                    </div>
                </div>
            </div>
            <div class="my-5">
                <button class="btn btn-add">Save</button>
            </div>
        </DForm>
    </div>
</template>

<script setup>
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
}

const payload = reactive({ ...defaultPayload })

const handleSubmit = () => {
    console.log(payload)
}

</script>