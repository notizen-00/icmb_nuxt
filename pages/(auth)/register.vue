<script setup lang="ts">
import { ref } from 'vue'
definePageMeta({
  layout: 'blank',
})

const name = ref('')
const email = ref('')
const affiliation = ref('')
const password = ref('')
const contact = ref('')
const confirm_password = ref('')
const error = ref('')
const success = ref(false)

const showPassword = ref(false)
const showConfirmPassword = ref(false)

async function handleSubmit() {
  const formData = new FormData()
  formData.append('name', name.value)
  formData.append('email', email.value)
  formData.append('affiliation', affiliation.value)
  formData.append('password', password.value)
  formData.append('contact',contact.value)
  formData.append('confirm_password', confirm_password.value)

  const config = useRuntimeConfig()
  const baseUrl = config.public.apiBaseUrl

  try {
    const response = await fetch(`${baseUrl}/register-manuscript`, {
      method: 'POST',
      body: formData,
    })

    const result = await response.json()

    if (!response.ok) {
      error.value = result.errors
      return
    }

    success.value = true
    alert('Registration successful!')
    error.value = ''

    // Clear input
    email.value = ''
    password.value = ''
    confirm_password.value= ''
    affiliation.value = ''
    name.value = ''
    contact.value = ''
  } catch (error: any) {
    console.error('Form submission error:', error)
    error.value = error
  }
}
</script>

<template>
  <LayoutAuth>
    <div class="min-h-screen w-full overflow-y-auto bg-black px-4 py-6 sm:px-6 lg:px-12">
      <div class="max-w-3xl w-full mx-auto">
        <div class="text-center mb-8 space-y-2">
          <h1 class="text-3xl font-bold tracking-tight text-white">Register Online</h1>
          <p class="text-sm text-gray-400">Please complete the form below !</p>
        </div>

        <div v-if="error && typeof error === 'object'" class="bg-red-50 text-red-700 p-4 rounded mb-4">
          <p class="font-semibold">Please fix the following:</p>
          <ul class="list-disc ml-5">
            <li v-for="(msgs, field) in error" :key="field">
              <strong>{{ field }}:</strong> {{ msgs.join(', ') }}
            </li>
          </ul>
        </div>

        <div v-if="success" class="bg-green-50 text-green-700 p-4 rounded mb-4">
          <p class="font-semibold">Register Success</p>
          Please wait manuscript verification from admin and check email !
        </div>

        <form @submit.prevent="handleSubmit" class="grid gap-6 bg-zinc-900 p-6 rounded-xl shadow-md">
          <!-- Email & Full Name -->
          <div class="grid md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-white mb-1">E-mail</label>
              <input
                v-model="email"
                type="email"
                placeholder="Please use valid email !"
                class="w-full bg-black text-white border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-white mb-1">Full Name</label>
              <input
                v-model="name"
                type="text"
                class="w-full bg-black text-white border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <!-- Affiliation -->
          <div>
            <label class="block text-sm font-medium text-white mb-1">Affiliation</label>
            <input
              v-model="affiliation"
              type="text"
              placeholder="Include code numbers to match authors above"
              class="w-full bg-black text-white border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p class="text-xs text-gray-400 mt-1">Give a code number to the different affiliates...</p>
          </div>

          <!-- Contact -->
          <div>
            <label class="block text-sm font-medium text-white mb-1">Contact (WhatsApp installed)</label>
            <input
              v-model="contact"
              type="text"
              class="w-full bg-black text-white border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <!-- Password -->
          <div class="relative">
            <label class="block text-sm font-medium text-white mb-1">Password</label>
            <input
              :type="showPassword ? 'text' : 'password'"
              v-model="password"
              class="w-full bg-black text-white border border-gray-700 rounded-lg px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-white"
            >
              <span v-if="showPassword" class="mt-4 pt-2"><i class="fal fa-eye"></i></span>
              <span v-else class="mt-4 pt-2"><i class="fal fa-eye-slash"></i></span>
            </button>
          </div>

          <!-- Confirm Password -->
          <div class="relative">
            <label class="block text-sm font-medium text-white mb-1">Confirm Password</label>
            <input
              :type="showConfirmPassword ? 'text' : 'password'"
              v-model="confirm_password"
              class="w-full bg-black text-white border border-gray-700 rounded-lg px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              @click="showConfirmPassword = !showConfirmPassword"
              class="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-white"
            >
              <span v-if="showConfirmPassword" class="mt-4 pt-2"><i class="fal fa-eye"></i></span>
              <span class="mt-4 pt-2" v-else><i class="fal fa-eye-slash"></i></span>
            </button>
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
