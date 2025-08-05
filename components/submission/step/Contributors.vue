<template>
  <div class="space-y-6">
    <h3 class="text-lg font-semibold">Contributors</h3>
    <p class="text-sm text-gray-600">
      Add details for all of the contributors to this submission. Contributors added here will receive an email confirmation of the submission.
    </p>
    
    <div class="flex gap-2">
      <!-- <button class="border px-3 py-1 text-sm rounded hover:bg-gray-100">Order</button>
      <button class="border px-3 py-1 text-sm rounded hover:bg-gray-100">Preview</button>
      <button class="border px-3 py-1 text-sm rounded hover:bg-gray-100">Add Contributor</button> -->
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
 
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
})
const submissionStore = useSubmissionStore();
// props.modelValue.contributors = submissionStore.detailSubmission.contributors.items;
const emit = defineEmits(['update:modelValue'])

const removeContributor = (index) => {
  const contributors = [...props.modelValue.contributors]
  contributors.splice(index, 1)
  emit('update:modelValue', { ...props.modelValue, contributors })
}

const editContributor = (index) => {
  alert('Edit contributor at index ' + index)
}
</script>
