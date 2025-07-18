<script setup lang="ts">
import { accounts, submissions } from '@/components/submission/data/submission'

const participantStore = useParticipantStore()

const submissionStore = useSubmissionStore()


onMounted(async()=>{

  await submissionStore.fetchDetail();
})


</script>

<template>
  <div class="-m-4 lg:-m-6">
    <SubmissionLayout
      :accounts="accounts"
      :participant="participantStore.detailParticipant"
      :nav-collapsed-size="4"
    />
  </div>
</template>
