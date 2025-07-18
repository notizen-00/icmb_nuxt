<script setup>

const submissionStore = useSubmissionStore()

const activeStage = computed(() => {
  return submissionStore.detailSubmission.submission_data.stages.find(stage => stage.isActiveStage)
})

const roundStatus = computed(() => {
  return activeStage.value?.status || 'Unknown stage status'
})
</script>

<template>
  <div>
    <h2 class="text-lg font-semibold mb-2">Round 1 Status</h2>
    <div class="border-l-5 border-blue-500 p-4 rounded mb-6">
      <p class="font-medium">{{ roundStatus }}</p>
    </div>

    <div class="mb-6">
      <h3 class="font-semibold mb-2"><i class="fal fa-bell"></i> Notifications</h3>
      <ul class="space-y-2 text-blue-600 underline" v-for="decision in submissionStore.detailSubmission.decision" :key="decision.id">
        <li>
          <span>{{ decision.description }}</span>
          <span class="text-sm text-gray-500 float-right">{{ formatDate(decision.dateDecided) }}</span>
        </li>
    
      </ul>
    </div>

    <div class="mb-6">
      <h3 class="font-semibold mb-2">Reviewer's Attachments</h3>
      <div class="italic text-gray-500">No Files</div>
    </div>

    <div class="mb-6">
      <h3 class="font-semibold text-lg mb-2">Revisions</h3>
      <div class="flex items-center justify-between">
        <a class="text-blue-600 underline" href="#">tes.docx</a>
        <span class="text-sm text-pink-600">July 14, 2025</span>
      </div>
    </div>

    <div>
      <h3 class="font-semibold mb-2">Review Discussions</h3>
      <table class="w-full text-sm text-left border rounded">
        <thead class="bg-gray-100">
          <tr>
            <th class="px-4 py-2">Name</th>
            <th class="px-4 py-2">From</th>
            <th class="px-4 py-2">Last Reply</th>
            <th class="px-4 py-2">Replies</th>
            <th class="px-4 py-2">Closed</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="px-4 py-2">=</td>
            <td class="px-4 py-2">testee</td>
            <td class="px-4 py-2">-</td>
            <td class="px-4 py-2">0</td>
            <td class="px-4 py-2">0</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


