// stores/Submission.ts
import { defineStore } from 'pinia'


export const useSubmissionStore = defineStore('Submission', {
  state: () => ({
    Submission: {} as any,
    detailSubmission:{} as any,
    isLoading: false,
    error: null as string | null,
  }),

  actions: {
    loadFromCache() {
      const cached = localStorage.getItem('Submission')
      if (cached) {
        this.Submission = JSON.parse(cached)
      }
    },

   async doSubmission(){

      const config = useRuntimeConfig()
      const baseUrl = config.public.apiBaseUrl
      const { token } = useAuth()

      this.isLoading = true
      this.error = null

      try {
        const { data, error } = await useFetch<any>(
          `${baseUrl}/submission/submit`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token.value}`,
              Accept: 'application/json',
            },
          }
        )

        if (error.value) throw new Error(error.value.message)


        // localStorage.setItem('Submission', JSON.stringify(this.Submission))
      } catch (err: any) {
        this.error = err.message || 'Failed to fetch Submissions'
      } finally {
        this.isLoading = false
      }
      
    },

    async updatePublication(formData:any){
      const config = useRuntimeConfig()
      const baseUrl = config.public.apiBaseUrl
      const { token } = useAuth()

      this.isLoading = true
      this.error = null
      console.log(formData);

      // alert(formData);

      try {
        const { data, error } = await useFetch<any>(
          `${baseUrl}/publication/update`,
          {
            method: 'POST',
            body:{
              "title":{
                "en":formData.title
              },
              "abstract":{
                "en":formData.abstract
              },
              "abstract_content":formData.abstract,
              "keywords":{
                "en":formData.keywords
              }
            },
            headers: {
              Authorization: `Bearer ${token.value}`,
              Accept: 'application/json',
            },
          }
        )

        if (error.value) throw new Error(error.value.message)


        // localStorage.setItem('Submission', JSON.stringify(this.Submission))
      } catch (err: any) {
        this.error = err.message || 'Failed to fetch Submissions'
      } finally {
        this.isLoading = false
      }
    },
    async fetchDetail(){
      const config = useRuntimeConfig()
      const baseUrl = config.public.apiBaseUrl
      const { token } = useAuth()

      this.isLoading = true
      this.error = null

      try {
        const { data, error } = await useFetch<any>(
          `${baseUrl}/submission/detail`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token.value}`,
              Accept: 'application/json',
            },
          }
        )

        if (error.value) throw new Error(error.value.message)

        this.detailSubmission = data.value
        // localStorage.setItem('Submission', JSON.stringify(this.Submission))
      } catch (err: any) {
        this.error = err.message || 'Failed to fetch Submissions'
      } finally {
        this.isLoading = false
      }
    },

    
  },
})
