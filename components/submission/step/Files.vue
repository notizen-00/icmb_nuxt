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
          <span class="text-xs bg-gray-100 border w-full text-black rounded px-2 py-0.5">
            {{ file?.genreName?.en || 'Unknown genre' }}
          </span>
          <button class="text-xs text-blue-500 hover:underline" @click.prevent="editFile(index)">Edit</button>
          <button class="text-xs text-pink-500 hover:underline" @click.prevent="removeFile(index)">Remove</button>
        </div>
      </div>
    </div>

    <!-- fallback kalau kosong -->
    <div v-else class="px-4 py-3 text-sm text-gray-500 text-center">
      No files available
    </div>

    <div>
    <SubmissionDialogUploadContent :submission="submission" />

    </div>
  </div>
</template>


<script setup>
import { defineProps, defineEmits } from 'vue'
import { FileIcon } from 'lucide-vue-next'


const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
})

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

const emit = defineEmits(['update:modelValue'])

const removeFile = (index) => {
  const files = [...props.modelValue.files]
  files.splice(index, 1)
  emit('update:modelValue', { ...props.modelValue, files })
}

const addFile = () => {

}

const editFile = (index) => {
  alert('Edit File at index ' + index)
}
</script>
