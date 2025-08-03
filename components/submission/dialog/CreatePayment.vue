
<script setup lang="ts">
import { toast } from 'vue3-toastify'
import type { UserParticipant } from '~/interfaces/participant';


const props = defineProps<{
  participant: any
}>()

console.log(props.participant)
const dialogRef = ref(false)


console.log(props.participant.id)
const teamId = ref('')
const amount = ref<number | null>(null)
const note = ref('')
const paymentFile = ref<File | null>(null)

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
  formData.append('participant_id', props.participant.id)
  formData.append('note', note.value)
  if (paymentFile.value) {
    formData.append('payment_file', paymentFile.value)
  }

  try {
    const response = await fetch(`${baseUrl}/payment`, {
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

    toast.success('Payment uploaded successfully!')
    // Reset form
    teamId.value = ''
    amount.value = null
    note.value = ''

    paymentFile.value = null
    dialogRef.value = false;
    useSubmissionStore().fetchAbstract();
  } catch (error: any) {
    console.error('Payment submission error:', error)
    toast.error('Error submitting payment.')
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
        <i class="fal fa-signal-stream text-blue-400"></i>
        Upload Payment 
      </button>
    </DialogTrigger>
    <DialogScrollContent class="sm:max-w-[700px] ">
      <DialogHeader>
        <DialogTitle><i class="fal fa-credit-card fa-beat"></i> Submit Payment </DialogTitle>
        <DialogDescription>
          Make changes to your profile here. Click save when you're done.
        </DialogDescription>
        <DialogClose @click="dialogRef = !dialogRef" class="text-red">Cancel Payment</DialogClose>
      </DialogHeader>
      <div class="grid gap-4 ">
       <form @submit.prevent="handleSubmit" class="grid gap-6 bg-zinc-900 p-6 rounded-xl shadow-md">

  <!-- Select Team -->
  <div>
    <label class="block text-sm font-medium text-white mb-1">Conference</label>
    {{ participant!.team.name    }}
  </div>

  <!-- Amount -->
  <div>
    <label class="block text-sm font-medium text-white mb-1">Amount</label>
    {{ formatCurrency(participant!.conference_type.price) }}
  </div>

  <!-- Note -->
  <div>
    <label class="block text-sm font-medium text-white mb-1">Note (optional)</label>
    <textarea
      v-model="note"
      rows="3"
      class="w-full bg-black text-white border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    ></textarea>
  </div>

  <!-- Upload File -->
  <div>
    <label class="block text-sm font-medium text-white mb-1">Upload Payment File (jpg, png, pdf)</label>
    <input
      type="file"
      accept=".jpg,.jpeg,.png,.pdf"
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
   <i class="fal fa-refresh fa-spin" v-if="isLoading"></i> Submit Payment
  </button>
</form>
      </div>
     
    </DialogScrollContent>
  </Dialog>
</template>
