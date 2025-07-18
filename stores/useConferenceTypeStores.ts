import { defineStore } from 'pinia'
import type { ConferenceType } from '~/types/conference-type'
export const useConferenceTypeStore = defineStore('conferenceType', {
  state: () => ({
    ConferenceTypes: [] as ConferenceType[],
    ConferenceType:{} as ConferenceType | {} | null ,
    products:[] as any[],
    isLoading: false,
    error: null as string | null
  }),

  actions: {
    async fetch() {
  const config = useRuntimeConfig()
  const baseUrl = config.public.apiBaseUrl
  
  this.isLoading = true
  this.error = null

  try {
    const { data, error } = await useFetch<ConferenceType[]>(`${baseUrl}/conference-type`)

    if (error.value) {
      throw new Error(error.value.message)
    }

    const responseData = data.value || []
    console.log(responseData)
    this.ConferenceTypes = responseData
  

  } catch (err: any) {
    this.error = err.message
  } finally {
    this.isLoading = false
  }
}
,
async fetchDetailConferenceTypes(id: number) {
  const config = useRuntimeConfig()
  const baseUrl = config.public.apiBaseUrl

  this.isLoading = true
  this.error = null

  try {
    // Tipe response harus disesuaikan karena kamu menerima { ConferenceType, product }
    const { data, error } = await useFetch<{ ConferenceType: ConferenceType; product: [] }>(`${baseUrl}ConferenceTypes/${id}`)

    if (error.value) {
      throw new Error(error.value.message)
    }

    // Assign ke state
    this.ConferenceType = data.value?.ConferenceType || null
    this.products = data.value?.product || []

   

  } catch (err: any) {
    this.error = err.message
  } finally {
    this.isLoading = false
  }
}

,

    getConferenceTypeById(id: number) {
      return this.ConferenceTypes.find(p => p.id === id)
    }
  }
})