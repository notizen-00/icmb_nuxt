
<script setup lang="ts">
import { toast } from 'vue3-toastify'


const conferenceTypestore = useConferenceTypeStore()
const conferenceStore = useConferenceStore()

conferenceStore.fetch()

const {data} = useAuth()


// Form model
const conferenceType = ref('')
const conferenceTypeList = ref<any>([])
const selectedConferenceType = ref<any>({})
const title = ref('')
const email = ref(data.value?.email)
const correspondingAuthor = ref(data.value?.name)
const originParticipation = ref('')
const formParticipation = ref('')
const authors = ref<string[]>([])
const affiliation = ref(data.value?.participant_detail.affiliation)
const teamId = ref('')
const contact = ref(data.value?.participant_detail.no_hp)
const participant_type = ref('')
const manuscript = ref<File | null>(null)
const referalCode = ref('')
const isLoading  = ref(false)
const dialogRef = ref(false)


// Handle file input
function onFileChange(e: Event) {
  const files = (e.target as HTMLInputElement).files
  if (files && files.length > 0) {
    manuscript.value = files[0]
  }
}

watch(teamId, async (newId) => {
  if (!newId) return


 const response =  await conferenceTypestore.fetch(newId)

  conferenceTypeList.value = conferenceTypestore.ConferenceTypes
  conferenceType.value = '' 
  selectedConferenceType.value = {}
})


watch(conferenceType, (newId) => {
  const typeObj = conferenceTypestore.ConferenceTypes.find((type) => type.id.toString() == newId)
  selectedConferenceType.value = typeObj || {}
  participant_type.value = typeObj.type_participant
})


async function handleSubmit() {

isLoading.value = true;
 if(participant_type.value == 'presenter'){
      if (!manuscript.value) {
    alert('Please upload your manuscript file before submitting.')
    isLoading.value = false;
    return
  }
 }


  const formData = new FormData()
  formData.append('participant_type',participant_type.value)
  formData.append('corresponding_email', email.value!)
  formData.append('corresponding_author', correspondingAuthor.value!)
  formData.append('conference_type_id', conferenceType.value) 
  formData.append('affiliation', affiliation.value!)
  formData.append('team_id', teamId.value)
  formData.append('contact', contact.value!)
  formData.append('referal_code',referalCode.value)

  authors.value.forEach((author: string) => {
  formData.append('author[]', author)
})
  formData.append('origin_of_participation',originParticipation.value)
  formData.append('form_of_participation',formParticipation.value)

  if(participant_type.value == 'presenter'){
     formData.append('manuscript', manuscript.value!)
     formData.append('manuscript_title', title.value)
  }
 


  const config = useRuntimeConfig()
  const baseUrl = config.public.apiBaseUrl

  const {token} = useAuth()
  try {
    const response = await fetch(`${baseUrl}/participant`, {
      method: 'POST',
       headers: {
        'Accept': 'application/json',
         Authorization: `Bearer ${token.value}`  
      },
      body: formData,
    })

    const result = await response.json()

    isLoading.value = false;

  if (!response.ok) {
    // Laravel validation error (422)
    if (response.status === 422 && result.errors) {
      const messages = Object.values(result.errors).flat().join('\n')
      toast.error(messages);

    }else if(response.status === 421 && result.message){
        const messages = Object.values(result.message);
        toast.error(messages);
    }

    // Unauthorized or general error
    throw new Error(result.message || 'Submission failed')
  }
   isLoading.value = false;
    alert('Registration successful!')
   isLoading.value = false;
    // Reset form fields
    conferenceType.value = ''
    title.value = ''
    email.value = ''
    correspondingAuthor.value = ''
    authors.value = []
    affiliation.value = ''
    teamId.value = ''
    contact.value = ''
    manuscript.value = null

  } catch (error:any) {
    console.error('Form submission error:', error.data)
     isLoading.value = false;
    // toast.error(error.errors || 'Failed to submit form !')
  }
}


</script>
<template>
  <Dialog :open="dialogRef">
    <DialogTrigger as-child>
    <button
      @click="dialogRef = !dialogRef"
  class="border border-b-4 border-r-4 active:border-b active:border-r transition duration-150 ease-in-out active:translate-y-[2px] border-blue-400 py-1 px-2 rounded-2 text-sm text-blue-500"
>
  <i class="fal fa-signal-stream text-blue-400"></i>
  Join Conference 
</button>

    </DialogTrigger>
    <DialogScrollContent class="sm:max-w-[700px] ">
      <DialogHeader>
        <DialogTitle><i class="fal fa-signal-stream fa-beat"></i> Join New Conference </DialogTitle>
        <DialogDescription>
          Make changes to your profile here. Click save when you're done.
        </DialogDescription>
          <DialogClose @click="dialogRef = !dialogRef" class="text-red">Cancel Join Conference</DialogClose>
      </DialogHeader>
      <div class="grid gap-4 ">
        <form @submit.prevent="handleSubmit" class="grid gap-6 bg-zinc-900 p-6 rounded-xl shadow-md">
          <!-- Participation -->

          <div>
            <label class="block text-sm font-medium text-white mb-1">
              Conference 
            </label>
            <select
              v-model="teamId"
              class="w-full bg-black text-white border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option disabled value="">Select a conference </option>
              <option
                v-for="type in conferenceStore.conferences"
                :key="type.id"
                :value="type.id"
              >
                {{ type.name  }}
              </option>
            </select>
          </div>
           
           <div>
            <label class="block text-sm font-medium text-white mb-1">
              Origin Of Participant
            </label>
           <select
              v-model="originParticipation"
            
              class="w-full bg-black text-white border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option disabled value="">Select origin of participation </option>
              <option value="indonesia"
              >
                Indonesia
              </option>
              <option value="non-indonesia">
                Non Indonesia
              </option>
            </select>
          </div>
           <div>
            <label class="block text-sm font-medium text-white mb-1">
              Form of Participation
            </label>
            <select
              v-model="formParticipation"
            
              class="w-full bg-black text-white border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option disabled value="">Select a participation </option>
              <option value="offline"
              >
                Offline
              </option>
              <option value="online">
                Online
              </option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-white mb-1">
              Conference Participation
            </label>
            <select
              v-model="conferenceType"
                :disabled="!conferenceTypeList.length"
                :class="!conferenceTypeList.length ? 'cursor-not-allowed':''"
              class="w-full bg-black text-white border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option disabled value="">Select a conference participation type</option>
              <option
                v-for="type in conferenceTypeList"
                :key="type.id"
                :value="type.id"
              >
                {{ type.name }} / {{ formatCurrency(type.price) }}
              </option>
            </select>
          </div>

          <!-- Title -->
          <template v-if="selectedConferenceType.type_participant == 'presenter' ">
          <div>
            <label class="block text-sm font-medium text-white mb-1">
              Manuscript Title
            </label>
            <input
              v-model="title"
              type="text"
              placeholder="Please write the title in sentence case style."
              class="w-full bg-black text-white border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <!-- Email & Author -->
          <div class="grid md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-white mb-1">
                Corresponding E-mail
              </label>
              <input
                v-model="email"
                type="email"
                placeholder="Please use valid email !"
                class="w-full bg-black text-white border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-white mb-1">
                Corresponding Author
              </label>
              <input
                v-model="correspondingAuthor"
                type="text"
                class="w-full bg-black text-white border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

           <label class="block text-sm font-medium text-white mb-1">
            Authors
            </label>
          <BaseMultiInput v-model="authors"></BaseMultiInput>
          <span class="text-xs text-slate-300">Please write down the full name of each author, use a semicolon (;) between names for a manuscript with multiple authors.</span>

          <!-- Affiliation -->
          <div>
            <label class="block text-sm font-medium text-white mb-1">
              Affiliation
            </label>
            <input
              v-model="affiliation"
              type="text"
              placeholder="Include code numbers to match authors above"
              class="w-full bg-black text-white border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p class="text-xs text-gray-400 mt-1">
              Give a code number to the different affiliates...
            </p>
          </div>

          <!-- Contact -->
          <div>
            <label class="block text-sm font-medium text-white mb-1">
              Contact (WhatsApp installed)
            </label>
            <input
              v-model="contact"
              type="text"
              class="w-full bg-black text-white border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <!-- Manuscript Upload -->
          <div>
            <label class="block text-sm font-medium text-white mb-1">
              Manuscript
            </label>
            <input
              type="file"
              accept=".doc,.docx"
              @change="onFileChange"
              class="block w-full text-sm text-white file:text-white file:bg-blue-700 file:border-0 file:px-4 file:py-2 file:rounded-lg file:cursor-pointer bg-black border border-gray-700 rounded-lg focus:outline-none"
            />
            <p class="text-xs text-gray-400 mt-1">
              Upload manuscript in Word format (.doc / .docx)
            </p>
          </div>
           <div>
           <p class="text-xs text-slate-200">  <Checkbox required class="mr-3"></Checkbox> By clicking the submit button below, I hereby agree to and accept the terms and conditions governing the process of conference, manuscript review, and full-paper publication. I further reaffirm my acceptance of the terms and conditions governing the options of publication. I am aware that there may be another APC to be paid if I agree to publish my paper in the International Indexed Proceeding or the conference-affiliated journals.</p>
          </div>

          <template v-if="selectedConferenceType.is_referal == true">
              <div>
            <label class="block text-sm font-medium text-white mb-1">
              Referal Code (use a valid referal code)
            </label>
            <input
              v-model="referalCode"
              type="text"
              class="w-full bg-black text-white border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          </template>
          </template>
         

          <!-- Submit Button -->
          <button
            type="submit"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg shadow-sm transition duration-150 ease-in-out"
          >
             <i class="fal fa-refresh fa-spin" v-if="isLoading"></i> Submit
          </button>
        </form>
      </div>
     
    </DialogScrollContent>
  </Dialog>
</template>
