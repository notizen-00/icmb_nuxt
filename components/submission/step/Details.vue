<template>
  <div class="space-y-6">
    <h3 class="text-lg font-semibold">Submission Details</h3>

    <div class="space-y-2">
      <label class="block text-sm font-medium">Title *</label>
      <input
        v-model="modelValue.title"
        type="text"
        class="w-full border rounded text-black px-3 py-2 text-black dark:bg-black dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        placeholder="Title of your paper"
      />
    </div>

    <div class="space-y-2">
      <label class="block text-sm font-medium">Keywords</label>
      <input
        v-model="modelValue.keywords"
        type="text"
        class="w-full border text-black dark:bg-black dark:text-white rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        placeholder="Example: AI, Networking, Security"
      />
    </div>

  <div v-if="isLoading" class="w-full h-[400px] flex items-center justify-center border rounded">
    <span class="text-gray-400">Loading...</span>
</div>
<div v-else class="min-h-[400px] max-h-[400px] overflow-y-auto border rounded p-2">
  <label class="block text-sm font-medium mb-2">Abstract</label> 
  <textarea v-model="modelValue.abstract" class="w-full dark:bg-black dark:text-white focus-ring focus-ring-red-300 text-black min-h-[200px]"/>


</div>

  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])
const submissionStore = useSubmissionStore()
const isLoading = ref(true)

const safeJSON = (json) => {
  try {
    const result = JSON.parse(json)
    return Array.isArray(result) ? result : []
  } catch {
    return []
  }
}

onMounted(async () => {
    isLoading.value = true

  emit('update:modelValue', {
    ...props.modelValue,
    title: submissionStore.detailSubmission?.submission_data?.publications?.[0]?.title['en'] || '',
    abstract: submissionStore.detailSubmission?.submission?.abstract || ''
  })

    isLoading.value = false
})

</script>
