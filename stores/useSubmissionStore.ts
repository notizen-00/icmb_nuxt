// stores/Submission.ts
import { defineStore } from 'pinia'
import { toast } from 'vue3-toastify'


export const useSubmissionStore = defineStore('Submission', {
  state: () => ({
    Submission: {} as any,
    detailSubmission:{} as any,
    listSubmission:[] as any,
    participant:[] as any,
    isLoading: false,
    isLoadingAbstract:false,
    isDialogRevision:false,
    isDialogAbstract:false,
    error: null as string | null,
  }),

  actions: {
    loadFromCache() {
      const cached = localStorage.getItem('Submission')
      if (cached) {
        this.Submission = JSON.parse(cached)
      }
    },

    toggleDialogRevision()
    {
      this.isDialogRevision = !this.isDialogRevision
    },
        toggleDialogAbstract()
    {
      this.isDialogAbstract = !this.isDialogAbstract
    },
    reset()
    {
      this.$reset();
    },

   async doSubmission(id:any){

      const config = useRuntimeConfig()
      const baseUrl = config.public.apiBaseUrl
      const { token } = useAuth()

      this.isLoading = true
      this.error = null

      try {
        const { data, error } = await $fetch<any>(
          `${baseUrl}/submission/submit/${id}`,
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
    async uploadRevisi(formdata:any){

       const config = useRuntimeConfig()
      const baseUrl = config.public.apiBaseUrl
      const { token } = useAuth()

      this.isLoading = true
      this.error = null

      // alert(formData);

      try {
        const { data, error } = await useFetch<any>(
          `${baseUrl}/submission/upload-file`,
          {
            method: 'POST',
            body:formdata,
            headers: {
              Authorization: `Bearer ${token.value}`,
              Accept: 'application/json',
            },
          }
        )

        if (error.value) throw new Error(error.value.message)


        // localStorage.setItem('Submission', JSON.stringify(this.Submission))
      } catch (err: any) {
        this.error = err.message || 'Failed to upload  Submissions'
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
  let body: Record<string, any> = {};

  switch (formData.step) {
    case 'details':
      body = {
        title: {
          en: formData.title,
        },
        abstract: {
          en: formData.abstract,
        },
        abstract_content: formData.abstract,
        keywords: {
          en: formData.keywords,
        },
        step: formData.step,
        submission_id: formData.submissionId,
      };
      break;

    case 'editors':
      body = {
        editors: formData.editors, // pastikan field ini ada di formData
        step: formData.step,
        submission_id: formData.submissionId,
      };
      break;

    case 'authors':
      body = {
        authors: formData.authors,
        step: formData.step,
        submission_id: formData.submissionId,
      };
      break;

    default:
      body = {
        step: formData.step,
        submission_id: formData.submissionId,
      };
      break;
  }

  const { data, error } = await useFetch<any>(`${baseUrl}/publication/update`, {
    method: 'POST',
    body,
    headers: {
      Authorization: `Bearer ${token.value}`,
      Accept: 'application/json',
    },
  });
  

        if (error.value) throw new Error(error.value.message)

        return 'success';

        // localStorage.setItem('Submission', JSON.stringify(this.Submission))
      } catch (err: any) {
        this.error = err.message || 'Failed to fetch Submissions'
      } finally {
        this.isLoading = false
      }
    },

    async fetchAbstract()
    {
      const config = useRuntimeConfig()
      const baseUrl = config.public.apiBaseUrl
      const { token } = useAuth()

      this.isLoading = true
      this.error = null

      try {
        const { data, error } = await useFetch<any>(
          `${baseUrl}/submission`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token.value}`,
              Accept: 'application/json',
            },
          }
        )

        if (error.value) throw new Error(error.value.message)

        this.participant = data.value
        // localStorage.setItem('Submission', JSON.stringify(this.Submission))
      } catch (err: any) {
        this.error = err.message || 'Failed to fetch Submissions'
      } finally {
        this.isLoading = false
        // toast.success('Berhasil load data submission')
      }
    },

    async fetchSubmission(){
       const config = useRuntimeConfig()
      const baseUrl = config.public.apiBaseUrl
      const { token } = useAuth()

      this.isLoading = true
      this.error = null

      try {
        const { data, error } = await useFetch<any>(
          `${baseUrl}/submission/get`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token.value}`,
              Accept: 'application/json',
            },
          }
        )

        if (error.value) throw new Error(error.value.message)

        this.listSubmission = data.value

        // const discussionStore = useDiscussionStore()

        // discussionStore.fetchDetail(this.detailSubmission.submission_internal.id);
        // localStorage.setItem('Submission', JSON.stringify(this.Submission))
      } catch (err: any) {
        this.error = err.message || 'Failed to fetch Submissions'
      } finally {
        this.isLoading = false
        // toast.success('Berhasil load data submission')
      }
    },

    async fetchSubmissionDetail(id:any)
    {
      const config = useRuntimeConfig()
      const baseUrl = config.public.apiBaseUrl
      const { token } = useAuth()

      this.isLoading = true
      this.error = null

      try {
        const { data, error } = await useFetch<any>(
          `${baseUrl}/submission/${id}`,
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

        // const discussionStore = useDiscussionStore()

        // discussionStore.fetchDetail(this.detailSubmission.submission_internal.id);
        // localStorage.setItem('Submission', JSON.stringify(this.Submission))
      } catch (err: any) {
        this.error = err.message || 'Failed to fetch Submissions'
      } finally {
        this.isLoading = false
        // toast.success('Berhasil load data submission')
      }
    },
    async fetchDetail(){
      const config = useRuntimeConfig()
      const baseUrl = config.public.apiBaseUrl
      const { token } = useAuth()

      this.isLoading = true
      this.error = null

      try {
        const { data, error } = await $fetch<any>(
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

        // const discussionStore = useDiscussionStore()

        // discussionStore.fetchDetail(this.detailSubmission.submission_internal.id);
        // localStorage.setItem('Submission', JSON.stringify(this.Submission))
      } catch (err: any) {
        this.error = err.message || 'Failed to fetch Submissions'
      } finally {
        this.isLoading = false
        // toast.success('Berhasil load data submission')
      }
    },

    
  },
})
