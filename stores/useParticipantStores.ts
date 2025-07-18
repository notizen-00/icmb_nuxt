// stores/participant.ts
import { defineStore } from 'pinia'
import type { UserParticipant } from '@/interfaces/participant'

export const useParticipantStore = defineStore('participant', {
  state: () => ({
    participant: {} as UserParticipant,
    detailParticipant:{} as UserParticipant,
    isLoading: false,
    error: null as string | null,
  }),

  actions: {
    loadFromCache() {
      const cached = localStorage.getItem('participant')
      if (cached) {
        this.participant = JSON.parse(cached)
      }
    },
    async fetchDetail(){
      const config = useRuntimeConfig()
      const baseUrl = config.public.apiBaseUrl
      const { token } = useAuth()

      this.isLoading = true
      this.error = null

      try {
        const { data, error } = await useFetch<UserParticipant>(
          `${baseUrl}/user/participant`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token.value}`,
              Accept: 'application/json',
            },
          }
        )

        if (error.value) throw new Error(error.value.message)

        this.detailParticipant = data.value as UserParticipant
        // localStorage.setItem('participant', JSON.stringify(this.participant))
      } catch (err: any) {
        this.error = err.message || 'Failed to fetch Participants'
      } finally {
        this.isLoading = false
      }
    },

    async fetch() {
      const config = useRuntimeConfig()
      const baseUrl = config.public.apiBaseUrl
      const { token } = useAuth()

      this.isLoading = true
      this.error = null

      try {
        const { data, error } = await useFetch<UserParticipant>(
          `${baseUrl}/user/participant`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token.value}`,
              Accept: 'application/json',
            },
          }
        )

        if (error.value) throw new Error(error.value.message)

        this.participant = data.value as UserParticipant
        localStorage.setItem('participant', JSON.stringify(this.participant))
      } catch (err: any) {
        this.error = err.message || 'Failed to fetch Participants'
      } finally {
        this.isLoading = false
      }
    },
  },
})
