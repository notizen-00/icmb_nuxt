<template>
  <div class="w-full max-w-full mx-auto p-8 h-screen overflow-y-auto">
    <!-- Stepper -->
    <div class="flex border-b mb-6 sticky top-0 z-10 bg-white">
      <button
        v-for="(step, index) in steps"
        :key="index"
        @click="goToStep(index)"
        :class="[
          'py-2 px-4 text-sm font-medium border-b-2 transition',
          currentStep === index
            ? 'border-blue-500 text-blue-500'
            : 'border-transparent text-gray-500 hover:text-blue-500'
        ]"
      >
        {{ index + 1 }}. {{ step.label }}
      </button>
    </div>

    <!-- Step Component -->
    <div class="min-h-[300px]">
      <component
        :is="steps[currentStep].component"
        v-bind="{
          modelValue: currentStep === 4 ? formData : formData[currentStep],
        }"
        @update:modelValue="(val) => formData[currentStep] = val"
      />
    </div>

    <!-- Actions -->
    <div class="flex justify-between mt-8">
      <button
        v-if="currentStep > 0"
        @click="currentStep--"
        class="px-4 py-2 border rounded hover:bg-gray-100"
      >
        Back
      </button>


      <div  v-if="currentStep < steps.length - 1">
      <button class="ml-auto px-4 bg-black-500 text-white hover:bg-white hover:text-black mr-3 py-2 rounded transition" @click="saveForLater()">
        Save for Later
      </button>


      <button
 
        @click="nextStep"
        :disabled="!canContinue"
        class="ml-auto px-4 py-2 rounded transition"
        :class="canContinue 
          ? 'bg-blue-500 text-white hover:bg-blue-600'
          : 'bg-gray-200 text-gray-400 cursor-not-allowed'"
      >
        Continue
      </button>
      </div>

      <button
        v-else
        @click.prevent="submitForm"
        class="ml-auto px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Submit
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watchEffect } from 'vue'
import SubmissionStepDetails from '@/components/submission/step/Details.vue'
import StepFiles from '@/components/submission/step/Files.vue'
import StepContributors from '@/components/submission/step/Contributors.vue'
import StepEditors from '@/components/submission/step/Editors.vue'
import StepReview from '@/components/submission/step/Review.vue'
import { toast } from 'vue3-toastify'
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps({
  submission: Object,
})

const submissionStore = useSubmissionStore()

const currentStep = ref(0)

const formData = ref([
  {
    title: '',
    keywords: '',
    abstract: '',
    step: 'details',
    submissionId: null
  },
  {
    files: [],
    step: 'files'
  },
  {
    contributors: [],
    step: 'contributors'
  },
  {
    commentsForTheEditors: '',
    step: 'editors',
    submissionId:null
  },
  {
    review: '',
    step: 'review'
  },
])

// Inject ID from store once submission is available
watchEffect(() => {
  const submission = submissionStore.detailSubmission?.submission
  if (submission?.id) {
    formData.value[0].submissionId = submission.id
    formData.value[3].submissionId = submission.id
    formData.value[2].contributors = submissionStore.detailSubmission?.contributors?.items || []
  }
})

const steps = [
  { label: 'Details', component: SubmissionStepDetails },
  { label: 'Upload Files', component: StepFiles },
  { label: 'Contributors', component: StepContributors },
  { label: 'For the Editors', component: StepEditors },
  { label: 'Review', component: StepReview },
]

// Validasi Tiap Step
const isStepValid = (stepIndex) => {
  const data = formData.value[stepIndex]
  switch (stepIndex) {
    case 0:
      return !!data.title?.trim() && !!data.abstract?.trim()
    case 1:
      return data.files && data.files.length > 0
    case 2:
      return Array.isArray(data.contributors) && data.contributors.length > 0
    case 3:
      return !!data.commentsForTheEditors?.trim()
    default:
      return true
  }
}

const canContinue = computed(() => isStepValid(currentStep.value))

const saveForLater = async() =>{
  
 
    const response = await submissionStore.updatePublication(formData.value[currentStep.value])
    if (response === 'success') {
      submissionStore.fetchSubmissionDetail(formData.value[0].submissionId)
      toast.success('sukses')
    } else {
      toast.error('error')
    }

}
const nextStep =  () => {
  if (!isStepValid(currentStep.value)) return

  // Step 0 needs saving before continuing
    currentStep.value++
  
}

const goToStep = (index) => {
  if (index > currentStep.value && !isStepValid(currentStep.value)) return
  currentStep.value = index
}

const submitForm = async () => {
  console.log('Final Form Data:', formData.value)
  const response = await submissionStore.doSubmission(submissionStore.detailSubmission?.submission?.id)
  if(response){
    router.push('/journal')
  }else{
    toast.success('submit data success')
    router.push('/journal')
  }

}
</script>
