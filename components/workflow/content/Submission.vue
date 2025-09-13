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

    <div class="flex justify-between w-full">
    <h2 class="text-lg font-semibold mb-2">Pre-Review Discussions</h2>
    <button class="ring-1 ring-blue-400 py-1 px-2 rounded-2 text-blue-400 mb-2" @click="discussionStore.toggleDialog()"> <i class="fal fa-comment"></i> Add Discussion</button>
    </div>
    <table class="w-full text-sm text-left border rounded">
        <thead class="bg-white dark:bg-black">
          <tr>
            <th class="px-4 py-2">Discussion</th>
            <th class="px-4 py-2">Owner</th>
            <th class="px-4 py-2">Description</th>
            <th class="px-4 py-2">Replies</th>
            <th class="px-4 py-2">Created At</th>
            <th class="px-4 py-2">Action</th>
          </tr>
        </thead>
       <tbody>
  <tr v-if="discussionStore.detailDiscussion.length > 0" v-for="i in discussionStore.detailDiscussion" :key="i.id">
    <td class="px-4 py-2">{{ i.discussion_name }}</td>
    <td class="px-4 py-2">{{ i.owner.name }}</td> 
    <td class="px-4 py-2">{{ i.description }}</td>
    <td class="px-4 py-2">{{ i.details.length }}</td>
    <td class="px-4 py-2">{{ formatDate(i.created_at) }}</td>
    <td class="px-4 py-2">
      <div v-if="i.owner_id == data.id">
        <button class="mr-2"><i class="fal fa-trash text-red"></i></button>
        <button class="mr-2"><i class="fal fa-eye text-blue-200"></i></button>
        <button><i class="fal fa-paper-plane text-blue-400"></i></button>
      </div>
      <div v-else>
        <button class="mr-2"><i class="fal fa-eye text-blue-200"></i></button>
        <button><i class="fal fa-paper-plane text-blue-400"></i></button>
      </div>
    </td>
  </tr>

  <!-- Jika kosong -->
  <tr v-else>
    <td class="px-4 py-2 text-center text-gray-500" colspan="6">
      No discussion
    </td>
  </tr>
</tbody>

      </table>
   
  </div>


   <WorkflowDialogAddDiscussion
    v-if="discussionStore.isDialog"
    :submissionId="submission.id"
    :teamId="submission.team_id"
    stage="submission"
    @close="showModal = false"
    @submitted="onDiscussionAdded"
  />

</template>

<script setup lang="ts">
import { computed } from 'vue'

const submissionStore = useSubmissionStore()
const discussionStore = useDiscussionStore();
const submissionFiles = computed(() => {
  return submissionStore.detailSubmission?.submission_files?.items || []
})
const {data} = useAuth()
const showModal = ref(discussionStore.isLoading);
const submission = { id: submissionStore.detailSubmission.submission.id, team_id: submissionStore.detailSubmission.submission.team_id }
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
