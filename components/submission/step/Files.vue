<template>
  <div class="space-y-6">
    <h3 class="text-lg font-semibold">Upload Files</h3>
    <p class="text-sm text-gray-600">
      Provide any files our editorial team may need to evaluate your submission...
    </p>

    <!-- jika ada files -->
    <div v-if="files.length" class="border rounded-md divide-y">
      <div 
        v-for="(file, index) in files" 
        :key="index" 
        class="flex items-center justify-between px-4 py-3"
      >
        <div class="flex items-center gap-3">
          <div class="text-blue-500"><FileIcon class="w-4 h-4" /></div>
          <a :href="file?.url || '#'">
            <span class="text-sm truncate w-full hover:underline">
              {{ file?.name?.en || 'Untitled file' }}
            </span>
          </a>
        </div>
        <div class="flex items-center gap-2">
          <span @click.prevent="addFile" class="text-xs bg-gray-100 border w-full text-black rounded px-2 py-0.5">
            {{ file?.genreName?.en || 'Unknown genre' }}
          </span>
  
          <button class="text-xs text-pink-500 hover:underline" @click.prevent="removeFile(index,file)">Remove</button>
        </div>
      </div>
    </div>

    <!-- fallback kalau kosong -->
    <div v-else class="px-4 py-3 text-sm text-gray-500 text-center">
      No files available
    </div>

    <div>
    <SubmissionDialogUploadContent :submission="submission" @fileUploaded="updateFiles" />

    </div>
  </div>
</template>


<script setup>
import { defineProps, defineEmits } from 'vue'
import { FileIcon } from 'lucide-vue-next'
import { toast } from 'vue3-toastify'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
})
const emit = defineEmits(['update:modelValue', 'goToStep'])
onMounted(() => {
  if (!files.value?.length && submissionStore.detailSubmission?.submission_files?.items) {
    files.value = submissionStore.detailSubmission.submission_files.items
  }
})

const files = computed({
  get: () => props.modelValue?.files ?? [],
  set: (val) => {
    emit('update:modelValue', { ...props.modelValue, files: val })
  },
})


const submissionStore = useSubmissionStore();
props.modelValue.files = submissionStore.detailSubmission?.submission_files?.items
const submission = submissionStore.detailSubmission.submission
console.log(submissionStore.detailSubmission.submission)



const removeFile = async (index, file) => {
  console.log(file)
  const config = useRuntimeConfig()
      const baseUrl = config.public.apiBaseUrl
      const { token } = useAuth()
  try {
    await $fetch(`${baseUrl}/submission/file/delete`, {
      method: 'POST',
      body: {
        submission_file_id: file.id,    
        stageId: 4,          
        submission_id: submission.id,
        team_id: submission.team_id,
      },
      headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.value}` 
        },
    })

    const files = [...props.modelValue.files]
    files.splice(index, 1)
    emit('update:modelValue', { ...props.modelValue, files })
    submissionStore.fetchSubmissionDetail(submission.id)
    emit('goToStep', 1) 

    toast.success('File deleted successfully')

  } catch (error) {
    console.error('Failed to delete file:', error)
    toast.error('Gagal menghapus file, coba lagi.')
  }
}

const addFile = () => {
  emit('goToStep', 2) 
}

const editFile = (index) => {
  alert('Edit File at index ' + index)
}

function updateFiles(newFiles) {
  files.value = newFiles
}
</script>
