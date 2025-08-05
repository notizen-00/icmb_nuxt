<template>
  <div class="space-y-6">
    <h3 class="text-lg font-semibold">Upload Files</h3>
    <p class="text-sm text-gray-600">
      Provide any files our editorial team may need to evaluate your submission. In addition to the main work, you may wish to submit data sets, conflict of interest statements, or other supplementary files.
    </p>
 
    <div class="border rounded-md divide-y">
      <div v-for="(file, index) in modelValue.files" :key="index" class="flex items-center justify-between px-4 py-3">
        <div class="flex items-center gap-3">
          <div class="text-blue-500 hover:underlined"><FileIcon class="w-4 h-4" /></div>
          <a :href="file.url">
          <span class="text-sm truncate w-full hover:underline">{{ file.name.en }}</span>
          </a>
         
        </div>
        <div class="flex items-center gap-2">
             <span class="text-xs bg-gray-100 border w-full text-black rounded px-2 py-0.5">{{ file.genreName.en }}</span>
          <button class="text-xs text-blue-500 hover:underline" @click.prevent="editFile(index)">Edit</button>
          <button class="text-xs text-pink-500 hover:underline" @click.prevent="removeFile(index)">Remove</button>
        </div>
      </div>
    </div>

    <div>
      <button
        @click="addFile"
        class="border text-sm px-4 py-1 rounded hover:bg-gray-100"
      >
        Add File
      </button>
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

const submissionStore = useSubmissionStore();
props.modelValue.files = submissionStore.detailSubmission?.submission_files?.items

const emit = defineEmits(['update:modelValue'])

const removeFile = (index) => {
  const files = [...props.modelValue.files]
  files.splice(index, 1)
  emit('update:modelValue', { ...props.modelValue, files })
}

const addFile = () => {
  const files = [...props.modelValue.files]
  files.push({
    name: 'new_file.docx',
    typeLabel: 'Supplementary',
  })
  emit('update:modelValue', { ...props.modelValue, files })
}

const editFile = (index) => {
  alert('Edit File at index ' + index)
}
</script>
