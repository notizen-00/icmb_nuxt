<script setup lang="ts">
import { ref } from 'vue'
definePageMeta({
  layout: 'blank',
})

const conferenceTypestore = useConferenceTypeStore()
const conferenceStore = useConferenceStore()
conferenceTypestore.fetch()
conferenceStore.fetch()

// Form model
const conferenceType = ref('')
const title = ref('')
const email = ref('')
const correspondingAuthor = ref('')
const authors = ref('')
const affiliation = ref('')
const teamId = ref('')
const contact = ref('')
const manuscript = ref<File | null>(null)
      


// Handle file input
function onFileChange(e: Event) {
  const files = (e.target as HTMLInputElement).files
  if (files && files.length > 0) {
    manuscript.value = files[0]
  }
}

// Handle submit
async function handleSubmit() {
  if (!manuscript.value) {
    alert('Please upload your manuscript file before submitting.')
    return
  }

  const formData = new FormData()
  formData.append('title', title.value)
  formData.append('email', email.value)
  formData.append('corresponding_author', correspondingAuthor.value)
  formData.append('conference_type_id', conferenceType.value) 
  formData.append('affiliation', affiliation.value)
  formData.append('team_id', teamId.value)
  formData.append('contact', contact.value)
  formData.append('manuscript', manuscript.value)

  const config = useRuntimeConfig()
  const baseUrl = config.public.apiBaseUrl
  console.log(formData);
  try {
    const response = await fetch(`${baseUrl}/register-manuscript`, {
      method: 'POST',
      body: formData,
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result?.message || 'Submission failed')
    }

    alert('Registration successful!')

    // Reset form fields
    conferenceType.value = ''
    title.value = ''
    email.value = ''
    correspondingAuthor.value = ''
    authors.value = ''
    affiliation.value = ''
    teamId.value = ''
    contact.value = ''
    manuscript.value = null

  } catch (error: any) {
    console.error('Form submission error:', error)
    alert(error.message || 'Failed to submit form.')
  }
}

</script>

<template>
  <LayoutAuth>
    <div class="min-h-screen w-full overflow-y-auto bg-black px-4 py-6 sm:px-6 lg:px-12">
      <div class="max-w-3xl w-full mx-auto">
        <div class="text-center mb-8 space-y-2">
          <h1 class="text-3xl font-bold tracking-tight text-white">Register Online</h1>
          <p class="text-sm text-gray-400">
            Please complete the form below to submit your manuscript
          </p>
        </div>

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
              Form of Presenter's Participation
            </label>
            <select
              v-model="conferenceType"
              class="w-full bg-black text-white border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option disabled value="">Select a participation type</option>
              <option
                v-for="type in conferenceTypestore.ConferenceTypes"
                :key="type.id"
                :value="type.id"
              >
                {{ type.name }} / {{ formatCurrency(type.price) }}
              </option>
            </select>
          </div>

          <!-- Title -->
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

          <!-- Submit Button -->
          <button
            type="submit"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg shadow-sm transition duration-150 ease-in-out"
          >
            Register
          </button>
        </form>

        <div class="text-center text-sm text-gray-400 mt-4">
          Already have an account?
          <NuxtLink to="/login" class="underline hover:text-white">Sign In</NuxtLink>
        </div>
      </div>
    </div>
  </LayoutAuth>
</template>
