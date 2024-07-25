import dogForm from 'vue-dog-form';
export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.use(dogForm)
})