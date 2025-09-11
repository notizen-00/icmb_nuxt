
<script setup lang="ts">
import { toast } from 'vue3-toastify'
import type { UserParticipant } from '~/interfaces/participant';



const props = defineProps<{
  submission:any
}>()

const dialogRef = ref(false)


const prefered_name = ref('')
const given_name = ref('')
const email = ref('')
const include_in_browse = ref(false)
const paymentFile = ref<File | null>(null)

const { token } = useAuth()
const config = useRuntimeConfig()
const baseUrl = config.public.apiBaseUrl
const isLoading = ref(false);
const countries = ref([])
const selectedCountry = ref('')

onMounted(async () => {
      const baseUrl = config.public.apiBaseUrl
  try {
    const data = await $fetch(`${baseUrl}/country`, { 
    })

    countries.value = data
  } catch (error) {
    console.error('Gagal fetch country:', error)
  }
})



async function handleSubmit() {

 isLoading.value = true;
  const formData = new FormData()
  formData.append('note', note.value)
  if (paymentFile.value) {
    formData.append('payment_file', paymentFile.value)
  }

  try {
    const response = await fetch(`${baseUrl}/payment`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token.value}`,
      },
      body: formData,
    })

    const result = await response.json()

    if (!response.ok) {
      if (response.status === 422 && result.errors) {
        const messages = Object.values(result.errors).flat().join('\n')
        toast.error(messages)
      }
      throw new Error(result.message || 'Failed to submit payment')
    }
    isLoading.value = false;

    toast.success('Payment uploaded successfully!')
    // Reset form
    teamId.value = ''
    amount.value = null
    note.value = ''

    paymentFile.value = null
    dialogRef.value = false;
    useSubmissionStore().fetchAbstract();
  } catch (error: any) {
    console.error('Payment submission error:', error)
    toast.error('Error submitting payment.')
    isLoading.value = false
  }
}



</script>
<template>
  <Dialog :open="dialogRef">
    <DialogTrigger as-child >
      <button
        class="ring-1 ring-blue-400 py-1 px-2 rounded-2 text-sm text-blue-500"
        @click="dialogRef = !dialogRef"
      >
        <i class="fal fa-user text-blue-400"></i>
        Add Contributor 
      </button>
    </DialogTrigger>
    <DialogScrollContent class="sm:max-w-[700px] ">
      <DialogHeader>
        <DialogTitle><i class="fal fa-user fa-beat"></i> Add Contributor </DialogTitle>
        <DialogDescription>
          Make changes to contributor here. Click save when you're done.
        </DialogDescription>
        <DialogClose @click="dialogRef = !dialogRef" class="text-red">Cancel </DialogClose>
      </DialogHeader>
      <div class="grid gap-4 ">
       <form @submit.prevent="handleSubmit" class="grid gap-6 bg-zinc-900 p-6 rounded-xl shadow-md">



  <!-- Note -->
  <div>
    <label class="block text-sm font-medium text-white mb-1">First Name <i class=" text-red-600 ">*</i></label>
    <input

    type="text"
    required
      v-model="given_name"
      rows="3"
      class="w-full bg-black  text-white border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:border-l-6 focus:border-red-300 focus:ring-blue-500"
    ></input>
  </div>
  <div>
    <label class="block text-sm font-medium text-white mb-1">Last Name </label>
    <input

    type="text"
    required
      v-model="prefered_name"
      rows="3"
      class="w-full bg-black text-white border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    ></input>
  </div>


  <div>
    <label class="block text-sm font-medium text-white mb-1">Email <i class=" text-red-600 ">*</i></label>
    <input
    type="text"
    required
      v-model="email"
      rows="3"
      class="w-full bg-black text-white border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    ></input>
  </div>
  <div>
    <label class="block text-sm font-medium text-white mb-1">Affiliation </label>
    <input
     type="text"
      v-model="affiliation"
      rows="3"
      class="w-full bg-black text-white border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    ></input>
  </div>
  <div>
    <label for="country" class="block mb-2" required>Country <i class=" text-red-600 ">*</i></label>
    <select
      id="country"
      v-model="selectedCountry"
      class="border bg-black text-white rounded px-3 py-2 w-full"
    >
      <option value="" disabled>Choose Country ...</option>
      <option
        v-for="country in countries"
        :key="country.code"
        :value="country.code"
      >
        {{ country.name }}
      </option>
    </select>

    <p class="mt-3">Country Code : {{ selectedCountry }}</p>
  </div>
  <div>
    <label class="block mb-2 font-bold">Publication List</label>

    <input type="checkbox" v-model="include_in_browse" /> <span>Include this contributor when identifying authors in lists of publications.</span>
  </div>



  <!-- Upload File -->
  

  <!-- Submit Button -->
  <button
    type="submit"
    class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg shadow-sm transition duration-150 ease-in-out"
  >
   <i class="fal fa-refresh fa-spin" v-if="isLoading"></i> Add Contributor
  </button>
</form>
      </div>
     
    </DialogScrollContent>
  </Dialog>
</template>
