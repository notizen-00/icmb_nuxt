<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Loader2 } from 'lucide-vue-next'
import PasswordInput from '~/components/PasswordInput.vue'

const router = useRouter()
const auth = useAuth()

const isLoading = ref(false)
const email = ref('')
const password = ref('')
const emailError = ref('')
const passwordError = ref('')

const onSubmit = async () => {
  emailError.value = ''
  passwordError.value = ''

  if (!email.value) {
    emailError.value = 'Email is required'
    return
  }
  if (!password.value) {
    passwordError.value = 'Password is required'
    return
  }

  isLoading.value = true

  try {
    const result = await auth.signIn(
      {
        credentials: {
          email: email.value,
          password: password.value,
        },
      },
      {
        callbackUrl: '/',
      }
    )

    if (result?.error) {
      throw new Error(result.error)
    }

    router.push('/')
  } catch (error) {
    console.error(error)
    alert('Username atau password salah.')
  } finally {
    isLoading.value = false
    email.value = ''
    password.value = ''
  }
}
</script>

<template>
  <div class="h-full mt-lg-4 flex items-center justify-center px-4">
    <div class="w-full max-w-md space-y-6">
      <form
        class="grid gap-6 bg-zinc-900 p-6 rounded-xl shadow-lg"
        @submit.prevent="onSubmit"
      >
        <div class="text-center">
          <h2 class="text-2xl font-semibold text-white">Login</h2>
          <p class="text-sm text-gray-400">Enter your credentials to sign in</p>
        </div>

        <!-- Email -->
        <div class="grid gap-2">
          <Label for="email">Email</Label>
          <Input
            id="email"
            v-model="email"
            type="email"
            placeholder="name@example.com"
            :disabled="isLoading"
            auto-capitalize="none"
            auto-complete="email"
            auto-correct="off"
          />
          <span class="text-red-400 text-sm">{{ emailError }}</span>
        </div>

        <!-- Password -->
        <div class="grid gap-2">
          <div class="flex items-center">
            <Label for="password">Password</Label>
            <NuxtLink
              to="/forgot-password"
              class="ml-auto text-sm underline text-gray-400 hover:text-white"
            >
              Forgot your password?
            </NuxtLink>
          </div>
          <PasswordInput id="password" v-model="password" :disabled="isLoading" />
          <span class="text-red-400 text-sm">{{ passwordError }}</span>
        </div>

        <!-- Submit -->
        <Button type="submit" class="w-full" :disabled="isLoading">
          <Loader2 v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
          Login
        </Button>
      </form>

      <!-- Footer -->
      <div class="text-center text-sm text-gray-400">
        Don't have an account?
        <NuxtLink to="/register" class="underline hover:text-white">Sign up</NuxtLink>
      </div>
    </div>
  </div>
</template>
