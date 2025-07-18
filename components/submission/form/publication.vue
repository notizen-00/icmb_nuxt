<template>
  <div class="w-full max-w-6xl mx-auto p-8 h-screen overflow-y-auto">
    <!-- Stepper -->
    <div class="flex border-b mb-6 sticky top-0 z-10">

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
      <component :is="steps[currentStep].component" v-model="formData[currentStep]" v-bind="currentStep === 4 ? { modelValue: formData } : { modelValue: formData[currentStep] }"/>
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

      <button
        v-if="currentStep < steps.length - 1"
        @click="nextStep"
        :disabled="!canContinue"
        class="ml-auto px-4 py-2 rounded transition"
        :class="canContinue 
          ? 'bg-blue-500 text-white hover:bg-blue-600'
          : 'bg-gray-200 text-gray-400 cursor-not-allowed'"
      >
        Continue
      </button>

      <button
        v-else
        @click="submitForm"
        class="ml-auto px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Submit
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import SubmissionStepDetails from '@/components/submission/step/Details.vue'
import StepFiles from '@/components/submission/step/Files.vue'
import StepContributors from '@/components/submission/step/Contributors.vue'
import StepEditors from '@/components/submission/step/Editors.vue'
import StepReview from '@/components/submission/step/Review.vue'

const props = defineProps({
  submission: Object,
})

const currentStep = ref(0)
const submissionStore = useSubmissionStore();

onMounted(async()=>{
  await submissionStore.fetchDetail();
})


const formData = ref([
  {
    title: '',
    keywords: '',
    abstract: '',
  },
  {
    files: [],
  },
  {
    contributors: submissionStore.detailSubmission.contributors?.items || [],
  },
  {
    commentsForTheEditors:'' ,
  },
  {
    review: '',
  },
])

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
      return data.contributors.length > 0
    case 3:
     const hasTextsContent = Array.isArray(data.commentsForTheEditors)
        && data.commentsForTheEditors.some(item => item.textContent?.trim().length > 0)
     return !!data.commentsForTheEditors?.trim()
    default:
      return true
  }
}


// Tombol Continue disabled jika tidak valid
const canContinue = computed(() => isStepValid(currentStep.value))

// Next Step
const nextStep = () => {
  if (isStepValid(currentStep.value)) {

    if(currentStep.value == 0 ){

        // alert('hii')
        console.log(formData.value[0])
        submissionStore.updatePublication(formData.value[0]);
      currentStep.value == 0;
    }
    currentStep.value++
  }
}

// Tidak bisa lompat ke depan jika belum valid
const goToStep = (index) => {
  if (index > currentStep.value) {
    if (!isStepValid(currentStep.value)) return
  }
  currentStep.value = index
}

// Submit Akhir
const submitForm = async() => {
  console.log('Final Form Data:', formData.value)


  await submissionStore.doSubmission()

}
</script>
