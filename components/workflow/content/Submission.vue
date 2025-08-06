<template>
  <div>
    <h2 class="text-lg font-semibold mb-2">Submission Files</h2>

    <ul
      v-if="submissionFiles.length"
      class="mb-6 divide-y border rounded"
    >
      <li
        v-for="file in submissionFiles"
        :key="file.filesId"
        class="flex items-center justify-between p-3"
      >

      <!-- {{ file }} -->
        <a
          class="text-blue-600 underline"
          target="_blank"
          @click="submissionStore.downloadFile(file.path)"
        >
          {{ file.name?.en || 'Untitled' }}
        </a>
        <div class="flex items-center space-x-3">
          <span class="text-sm text-pink-600">
            {{ formatDate(file.createdAt) }}
          </span>
          <span
            v-if="file.genreName?.en"
            class="ring rounded-2 py-1 px-2 text-xs ring-blue-300"
          >
            {{ file.genreName.en }}
          </span>
        </div>
      </li>
    </ul>

    <p v-else class="text-sm text-gray-500 italic mb-6">No files available.</p>

    <h2 class="text-lg font-semibold mb-2">Pre-Review Discussions</h2>
    <div class="border p-4 text-gray-500 italic rounded">
      No Items
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const submissionStore = useSubmissionStore()

const submissionFiles = computed(() => {
  return submissionStore.detailSubmission?.submission_files?.items || []
})


function formatDate(dateStr: string | undefined): string {
  if (!dateStr) return '-'
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
</script>
