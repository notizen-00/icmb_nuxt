<template>

    
  <!-- <div v-if="submissionStore.isLoading" class="flex justify-center items-center flex-col h-100">
    <i class="fal fa-refresh fa-spin"></i> Loading...
  </div> -->

  <div v-if="!submissionStore.detailSubmission?.submission">
    <div class="text-center mt-10">
      <h2 class="text-2xl font-bold">404 - Submission Not Found</h2>
      <p class="text-gray-600 mt-2">The requested submission doesn't exist or has been removed.</p>
       <div class="mt-6 flex gap-4 flex justify-center w-full">
        <Button @click="router.push('/')">
          Back to Home
        </Button>
      </div>
    </div>
  </div>

  <div v-else>
    <SubmissionFormPublication
      v-if="submissionStore.detailSubmission.submission.status === 'incomplete'"
      :submission="submissionStore.detailSubmission.submission"
    />
    <WorkflowLayout v-else />
  </div>
</template>


<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'


const router = useRouter()
const route = useRoute()
const submissionStore = useSubmissionStore()

const journalId = route.params.id as string

onMounted(async()=>{
    await submissionStore.fetchSubmissionDetail(journalId)
    await useDiscussionStore().fetchDetail(journalId)
})

</script>
