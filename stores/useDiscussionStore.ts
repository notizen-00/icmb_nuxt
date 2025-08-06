// stores/Discussion.ts
import { defineStore } from 'pinia'
import { toast } from 'vue3-toastify'


export const useDiscussionStore = defineStore('Discussion', {
  state: () => ({
    Discussion: {} as any,
    detailDiscussion:{} as any | null,
    isLoading: false,
    isDialog:false,
    isDialogNote:false,
    error: null as string | null,
  }),

  actions: {
    loadFromCache() {
      const cached = localStorage.getItem('Discussion')
      if (cached) {
        this.Discussion = JSON.parse(cached)
      }
    },

    toggleDialog()
    {
        this.isDialog = !this.isDialog
    },

     toggleDialogNote()
    {
        this.isDialogNote = !this.isDialogNote
    },

   async create(form:any){

      const config = useRuntimeConfig()
      const baseUrl = config.public.apiBaseUrl
      const { token } = useAuth()
    console.log(form);
      this.isLoading = true
      this.error = null

      try {
        const { data, error } = await useFetch<any>(
          `${baseUrl}/discussion/store`,
          {
            method: 'POST',
            body:form,
            headers: {
              Authorization: `Bearer ${token.value}`,
              Accept: 'application/json',
            },
          }
        )

        if (error.value) throw new Error(error.value.message)
        
        this.isLoading = false
        this.isDialog = false

        await this.fetchDetail(form.submission_id);

        toast.success('Berhasil menambhakan diskusi');
        

        // localStorage.setItem('Discussion', JSON.stringify(this.Discussion))
      } catch (err: any) {
        this.error = err.message || 'Failed to fetch Discussions'
      } finally {
        this.isLoading = false
         this.isDialog = false
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


        // localStorage.setItem('Discussion', JSON.stringify(this.Discussion))
      } catch (err: any) {
        this.error = err.message || 'Failed to fetch Discussions'
      } finally {
        this.isLoading = false
      }
    },
    async fetchDetail(submission_id:any){
      const config = useRuntimeConfig()
      const baseUrl = config.public.apiBaseUrl
      const { token } = useAuth()

      this.isLoading = true
      this.error = null

      try {
        const { data, error } = await useFetch<any>(
          `${baseUrl}/discussion/${submission_id}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token.value}`,
              Accept: 'application/json',
            },
          }
        )

        if (error.value) throw new Error(error.value.message)

        this.detailDiscussion = data.value ?? null
        return data.value;
        // localStorage.setItem('Discussion', JSON.stringify(this.Discussion))
      } catch (err: any) {
        this.error = err.message || 'Failed to fetch Discussions'
      } finally {
        this.isLoading = false
      }
    },

    
  },
})
