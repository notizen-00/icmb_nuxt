<script setup lang="ts">
import { accounts, submissions } from '@/components/submission/data/submission'

const participantStore = useParticipantStore()

const submissionStore = useSubmissionStore()

submissionStore.fetchSubmission();

</script>

<template>
  <div class="-m-4 lg:-m-6">
    <JournalLayout
      :accounts="accounts"
      :participant="participantStore.detailParticipant"
      :submission-participant="submissionStore.listSubmission"
      :nav-collapsed-size="4"
    />
  </div>
</template>
