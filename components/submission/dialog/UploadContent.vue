
<script setup lang="ts">
import { toast } from 'vue3-toastify'
import type { UserParticipant } from '~/interfaces/participant';

const props = defineProps<{
    submission: any
}>()

const dialogRef = ref(false)
const emit = defineEmits(['fileUploaded'])

const paymentFile = ref<File | null>(null)
const submissionStore = useSubmissionStore();
const { token } = useAuth()
const config = useRuntimeConfig()
const baseUrl = config.public.apiBaseUrl
const isLoading = ref(false);

function onPaymentFileChange(e: Event) {
  const files = (e.target as HTMLInputElement).files
  if (files && files.length > 0) {
    paymentFile.value = files[0]
  }
}

async function handleSubmit() {

 isLoading.value = true;
  const formData = new FormData()
  formData.append('type','other')
  formData.append('submission_id',props.submission.id)
  formData.append('team_id',props.submission.team_id)
  if (paymentFile.value) {
    formData.append('file', paymentFile.value)
  }

  try {
    const response = await fetch(`${baseUrl}/submission/upload-file`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token.value}`,
      },
      body: formData,
    })

    const result = await response.json()

    if (!response.ok) {
      if (response.status === 422 && result.errors) {
        const messages = Object.values(result.errors).flat().join('\n')
        toast.error(messages)
      }
      throw new Error(result.message || 'Failed to submit payment')
    }
    isLoading.value = false;

    toast.success('File uploaded successfully!')
    // Reset form


    paymentFile.value = null
    dialogRef.value = false;
    await submissionStore.fetchSubmissionDetail(props.submission.id);

    const newFiles = submissionStore.detailSubmission?.submission_files?.items ?? []


    emit('fileUploaded', newFiles)
  } catch (error: any) {
    console.error('Payment submission error:', error)
    toast.error('Error submitting file.')
    isLoading.value = false
  }
}



</script>
<template>
  <Dialog :open="dialogRef">
    <DialogTrigger as-child >
      <button
        class="ring-1 ring-blue-400 py-1 px-2 rounded-2 text-sm text-blue-500"
        @click="dialogRef = !dialogRef"
      >
        <i class="fal fa-file text-blue-400"></i>
        Upload File 
      </button>
    </DialogTrigger>
    <DialogScrollContent class="sm:max-w-[700px] ">
      <DialogHeader>
        <DialogTitle><i class="fal fa-credit-card fa-beat"></i> Submit File </DialogTitle>
        <DialogDescription>
          Make changes to your profile here. Click save when you're done.
        </DialogDescription>
        <DialogClose @click="dialogRef = !dialogRef" class="text-red">Cancel </DialogClose>
      </DialogHeader>
      <div class="grid gap-4 ">
       <form @submit.prevent="handleSubmit" class="grid gap-6 bg-zinc-900 p-6 rounded-xl shadow-md">


  <!-- Upload File -->
  <div>
    <label class="block text-sm font-medium text-white mb-1">Upload Manuscript File (pdf,doc,docx)</label>
    <input
      type="file"
      accept=".docx,.pdf,.doc"
      required
      @change="onPaymentFileChange"
      class="block w-full text-sm text-white file:text-white file:bg-blue-700 file:border-0 file:px-4 file:py-2 file:rounded-lg file:cursor-pointer bg-black border border-gray-700 rounded-lg focus:outline-none"
    />
    <p class="text-xs text-gray-400 mt-1">Max size 2MB.</p>
  </div>

  <!-- Submit Button -->
  <button
    type="submit"
    class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg shadow-sm transition duration-150 ease-in-out"
  >
   <i class="fal fa-refresh fa-spin" v-if="isLoading"></i> Submit File
  </button>
</form>
      </div>
     
    </DialogScrollContent>
  </Dialog>
</template>
