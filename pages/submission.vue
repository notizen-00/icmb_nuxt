<script setup lang="ts">
import { accounts, submissions } from '@/components/submission/data/submission'

const participantStore = useParticipantStore()

const submissionStore = useSubmissionStore()



submissionStore.fetchDetail();
submissionStore.fetchAbstract();



</script>

<template>
  <div class="-m-4 lg:-m-6">
    <SubmissionLayout
      :accounts="accounts"
      :participant="participantStore.detailParticipant"
      :submission-participant="submissionStore.participant"
      :nav-collapsed-size="4"
    />
  </div>
</template>
