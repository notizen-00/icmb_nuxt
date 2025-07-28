<script setup lang="ts">
import { Sonner } from '@/components/ui/sonner'
import { ConfigProvider } from 'radix-vue'

const colorMode = useColorMode()

const color = computed(() => colorMode.value === 'dark' ? '#09090b' : '#ffffff')

const { theme, radius } = useCustomize()

useHead({
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: color },
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' },
    { rel: 'stylesheet', href: 'https://site-assets.fontawesome.com/releases/v6.7.2/css/all.css' },
  { rel: 'stylesheet', href: 'https://site-assets.fontawesome.com/releases/v6.7.2/css/sharp-duotone-thin.css' },
  { rel: 'stylesheet', href: 'https://site-assets.fontawesome.com/releases/v6.7.2/css/sharp-duotone-solid.css' },
  { rel: 'stylesheet', href: 'https://site-assets.fontawesome.com/releases/v6.7.2/css/sharp-duotone-regular.css' },
  { rel: 'stylesheet', href: 'https://site-assets.fontawesome.com/releases/v6.7.2/css/sharp-duotone-light.css' },
  { rel: 'stylesheet', href: 'https://site-assets.fontawesome.com/releases/v6.7.2/css/sharp-thin.css' },
  { rel: 'stylesheet', href: 'https://site-assets.fontawesome.com/releases/v6.7.2/css/sharp-solid.css' },
  { rel: 'stylesheet', href: 'https://site-assets.fontawesome.com/releases/v6.7.2/css/sharp-regular.css' },
  { rel: 'stylesheet', href: 'https://site-assets.fontawesome.com/releases/v6.7.2/css/sharp-light.css' },
  { rel: 'stylesheet', href: 'https://site-assets.fontawesome.com/releases/v6.7.2/css/duotone-thin.css' },
  { rel: 'stylesheet', href: 'https://site-assets.fontawesome.com/releases/v6.7.2/css/duotone-regular.css' },
  { rel: 'stylesheet', href: 'https://site-assets.fontawesome.com/releases/v6.7.2/css/duotone-light.css' },
  ],
  script: [

        {
          src: 'https://app.sandbox.midtrans.com/snap/snap.js',
          async: true,
          "data-client-key":"SB-Mid-client-Wg5leIiJk3ql0n75"

        },
      ],
  htmlAttrs: {
    lang: 'en',
  },
  bodyAttrs: {
    class: computed(() => `theme-${theme.value}`),
    style: computed(() => `--radius: ${radius.value}rem;`),
  },
})

const title = 'ICMB-APP '
const description = 'Dengan antarmuka yang ramah pengguna dan sistem yang aman, Conference International membantu Anda fokus pada yang terpenting: konten dan koneksi. Cocok untuk seminar ilmiah, simposium, webinar, hingga forum global.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogUrl: 'https://conference.feb.unej.ac.id',
  ogImage: 'https://nuxt-shadcn-dashboard.vercel.app/social-card.png',
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: 'https://nuxt-shadcn-dashboard.vercel.app/social-card.png',
  twitterCard: 'summary_large_image',
})

const router = useRouter()

defineShortcuts({
  'G-H': () => router.push('/'),
  'G-E': () => router.push('/email'),
})

const useIdFunction = () => useId()

const textDirection = useTextDirection({ initialValue: 'ltr' })
const dir = computed(() => textDirection.value === 'rtl' ? 'rtl' : 'ltr')
</script>

<template>
  <ConfigProvider :use-id="useIdFunction" :dir="dir">
    <div vaul-drawer-wrapper class="relative">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>

      <AppSettings />
    </div>

    <Toaster />
    <Sonner class="pointer-events-auto" />
  </ConfigProvider>
</template>
