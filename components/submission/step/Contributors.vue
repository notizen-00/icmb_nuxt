<template>
  <div class="space-y-6">
    <h3 class="text-lg font-semibold">Contributors</h3>
    <p class="text-sm text-gray-600">
      Add details for all of the contributors to this submission. Contributors added here will receive an email confirmation of the submission.
    </p>
    
    <div class="flex gap-2">
      <!-- <button class="border px-3 py-1 text-sm rounded hover:bg-gray-100">Order</button>
      <button class="border px-3 py-1 text-sm rounded hover:bg-gray-100">Preview</button> -->
  
      <SubmissionDialogCreateContributor :submission="submission"></SubmissionDialogCreateContributor>
    </div>
    <!-- {{ submissionStore.detailSubmission.contributors.items }} -->

    <div class="border rounded divide-y">
      <div
        v-for="(contributor, index) in submissionStore.detailSubmission?.contributors?.items"
        :key="index"
        class="flex justify-between items-center p-4"
      >
        <div>
          <div class="flex items-center gap-2">
            <span class="font-medium">{{ contributor.fullName }}</span>
            <span class="text-xs bg-gray-100 border rounded text-black px-2 py-0.5">{{ contributor.userGroupName.en }}</span>
          </div>
          <div class="text-sm text-gray-500">{{ contributor.affiliation.en }}</div>
        </div>

        <div class="flex items-center gap-2">
          <span v-if="contributor.id == submissionStore.detailSubmission.submission_data.publications[0].primaryContactId" class="text-xs bg-blue-600 text-white px-2 py-0.5 rounded">
            Primary Contact
          </span>

          <span v-else @click="removeContributor(contributor.id)" class="text-xs cursor-pointer bg-red-600 text-white px-2 py-0.5 rounded">
           <i class="fal fa-trash text-danger"></i> Delete
          </span>
 
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import { toast } from 'vue3-toastify'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
})

const submissionStore = useSubmissionStore();
const emit = defineEmits(['update:modelValue'])
const submission = submissionStore.detailSubmission.submission;
const removeContributor = async (id) => {
  if (!confirm('Are you sure you want to delete this contributor?')) return;

  try {
    const { token } = useAuth()
    const config = useRuntimeConfig()
    const baseUrl = config.public.apiBaseUrl

      const formData = new FormData()
      formData.append('submission_id',submission.id)
      formData.append('team_id',submission.team_id)
      formData.append('contributor_id',id)


    const response = await $fetch(`${baseUrl}/contributor/delete`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token.value}`,
      },
      body:formData
    });

    await submissionStore.fetchSubmissionDetail(submission.id);

    toast.success('Contributor deleted successfully');
  } catch (error) {
    console.error('Failed to delete contributor:', error);
    toast.error('Failed to delete contributor');
  }
};


const editContributor = (index) => {
  alert('Edit contributor at index ' + index)
}
</script>
