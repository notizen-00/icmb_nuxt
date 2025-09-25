// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr:true,
   runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api',
      BaseUrl: process.env.NUXT_ASSET_BASE_URL || 'http://localhost/storage/images/',
      shipBase: 'https://pro.rajaongkir.com/api',
      shipKey:'a21c1b1d2b61425d9d8eaa936a1fe3e5',
      ServerUrl:process.env.NUXT_PUBLIC_API_URL
    },
  },
  modules: [
    '@unocss/nuxt',
    'shadcn-nuxt',
    '@vueuse/nuxt',
    '@nuxt/eslint',
    '@nuxt/icon',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@sidebase/nuxt-auth',
  ],
   pinia: {
      autoImports: ['defineStore'], 
    },
  auth: {
    isEnabled: true,
    disableServerSideAuth: false,
    // baseURL: 'http://unej-be.test/',
    baseURL: 'https://conference.feb.unej.ac.id/',
    provider: { type:'local',
    pages: {
        login: '/login'
    },
    endpoints: {
        signIn: { path: 'api/v1/login/google', method: 'post' },
        signOut: { path: 'api/v1/logout', method: 'post' },
        signUp: { path: 'api/v1/register', method: 'post' },
        getSession: { path: 'api/v1/user', method: 'get' },
        refresh: { path: 'api/v1/refresh', method: 'post' },
      },
    session: {
        dataType: {
          id: 'string | number',
          email: 'string',
          name: 'string',
          email_verified_at:'String | null',
          participant_detail:{
            affiliation:'string',
            no_hp:'string'
          }
        },
      },
      redirect: {
        login: '/login', 
        logout: '/', 
      },
    // token: {
    //     signInResponseTokenPointer: '/token',
    //     type: 'Bearer',
    //     cookieName: 'auth.token',
    //     headerName: 'Authorization',
    //     maxAgeInSeconds: 1800,
    //     sameSiteAttribute: 'lax',
    //     cookieDomain: 'sidebase.io',
    //     secureCookieAttribute: false,
    //     httpOnlyCookieAttribute: false,
    //   },
      refresh: {
        isEnabled: true,
        endpoint: { path: 'api/v1/refresh', method: 'post' ,
        },
        refreshOnlyToken: true,
        token: {
          signInResponseRefreshTokenPointer: '/refresh-token',
          refreshResponseTokenPointer: '/access-token',
          refreshRequestTokenPointer: '/refresh-token',
          cookieName: 'auth.refresh-token',
          maxAgeInSeconds: 1800,
          sameSiteAttribute: 'lax',
          secureCookieAttribute: false,
          cookieDomain: 'unej-be.test',
          httpOnlyCookieAttribute: false,
        }
      },

       },
    sessionRefresh: {
      enablePeriodically: false,
      enableOnWindowFocus: false,
    },
    
  },

  css: [
    '@unocss/reset/tailwind.css',
  ],

  colorMode: {
    classSuffix: '',
  },

  features: {
    // For UnoCSS
    inlineStyles: false,
  },

  eslint: {
    config: {
      standalone: false,
    },
  },

  routeRules: {
    '/components': { redirect: '/components/accordion' },
    '/settings': { redirect: '/settings/profile' },
  },

  imports: {
    dirs: [
      './lib',
    ],
  },

  compatibilityDate: '2024-12-14',
})