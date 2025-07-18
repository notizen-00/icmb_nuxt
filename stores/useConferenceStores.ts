import { defineStore } from 'pinia'

export const useConferenceStore = defineStore('conference', {
  state: () => ({
    conferences: [] as Record<string,any>,
    conference: {} as Record<string, any>,
    products: [] as any[],
    isLoading: false,
    error: null as string | null,
  }),

  actions: {
    async fetch() {
      const config = useRuntimeConfig()
      const baseUrl = config.public.apiBaseUrl

      this.isLoading = true
      this.error = null

      try {
        const { data, error } = await useFetch(`${baseUrl}/conference`, {
          method: 'GET',
        })

        if (error.value) {
          throw new Error(error.value.message)
        }

        this.conferences = data.value || []
        console.log('Fetched conferences:', this.conferences)

      } catch (err: any) {
        this.error = err.message || 'Failed to fetch conferences'
      } finally {
        this.isLoading = false
      }
    },
  },
})
