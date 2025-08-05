<template>
  <div class="p-0 max-w-full mx-auto shadow rounded">
    <WorkflowPartialToolbar :submission="submissionStore.detailSubmission?.submission"></WorkflowPartialToolbar>
    <Tabs :tabs="stageTabs" :activeTab="activeTab" @changeTab="activeTab = $event" />
    <div class="mt-6">
      <component :is="currentComponent" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import Tabs from './partial/Tab.vue'
import Submission from '@/components/workflow/content/Submission.vue'
import Review from '@/components/workflow/content/Review.vue'
import Copyediting from '@/components/workflow/content/Copyediting.vue'
import Production from '@/components/workflow/content/Production.vue'

const submissionStore = useSubmissionStore()

const stageTabs = computed(() => {
  return submissionStore.detailSubmission?.submission_data?.stages || []
})

const activeTab = ref<string>('')

watch(stageTabs, (tabs) => {
  const firstActive = tabs.find((tab: any) => tab.isActiveStage)
  if (firstActive) {
    activeTab.value = firstActive.label
  } else if (tabs.length > 0) {
    activeTab.value = tabs[0].label 
  }
}, { immediate: true })

const currentComponent = computed(() => {
  return {
    Submission,
    Review,
    Copyediting,
    Production
  }[activeTab.value] || Submission 
})
</script>
