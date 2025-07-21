<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div
      class="bg-white dark:bg-gray-800 rounded-lg w-full max-w-xl p-6 space-y-4"
    >
        <div class="flex justify-between">
      <h2 class="text-lg font-semibold">
        Upload Revision File {{ stage }}
      </h2>
       <i class="fal fa-close cursor-pointer" @click="submissionStore.toggleDialogRevision()"></i>
      </div>

      <form @submit.prevent="submitRevision" class="space-y-4">
        <div>
          <label class="block font-medium mb-1">File</label>
         <input
  type="file"
  @change="handleFileChange"
  accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  required
  class="w-full border rounded px-3 py-2 bg-gray-50 dark:bg-gray-700 text-black dark:text-white"
/>

        </div>

        

        <div class="flex space-x-4">
          <button
            type="submit"
            class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
           <i :class=" submissionStore.isLoading ? 'fal fa-refresh':'' "></i> Upload File
          </button>
        </div>
      </form>

      <p v-if="submissionStore.error" class="text-sm text-red-500">{{ submissionStore.error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const props = defineProps({
  submissionId: { type: Number, required: true },
  teamId: { type: Number, required: true },
  stage: { type: String, required: true },
})

const submissionStore = useSubmissionStore()
const emits = defineEmits(['close', 'submitted'])

const isOpen = ref(submissionStore.isDialogRevision)
const error = ref('')

const form = reactive({
  type: 'revision',
  file: null,
  status: true,
  submission_id: props.submissionId,
  team_id: props.teamId,
  stage: props.stage,
})

async function handleFileChange(event) {
  const files = event.target.files
  if (files.length > 0) {
    form.file = files[0]
  }
}

async function submitRevision() {
  try {
    console.log(form)
     const formData = new FormData()
    formData.append('type', form.type)
    formData.append('file', form.file)
    await submissionStore.uploadRevisi(formData)
  } catch (e) {
    console.log(e)
    error.value = e.message || 'Failed to upload file'
  }
}
</script>

<style scoped>
/* Optional styling */
</style>
