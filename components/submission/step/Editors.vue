<template>
  <div class="space-y-6">
    <h3 class="text-lg font-semibold">Submission Details</h3>

   

    <div class="space-y-2">
      <label class="block text-sm font-medium">Comment For Editor  *</label>

        <p class="text-sm text-gray-600">
    Add any information that you think our editorial staff should know when evaluating your submission.
    </p>
      <div class="min-h-[400px] max-h-[400px] overflow-y-auto border rounded p-2">
        <label class="block text-sm font-medium mb-2">Comment for the editors </label> 
        <textarea v-model="modelValue.commentsForTheEditors" class="w-full text-black min-h-[200px]"/>
      </div>
    </div>

 
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
})
const emit = defineEmits(['update:modelValue'])

const contentData = ref(props.modelValue.commentsForTheEditors || '')


watch(contentData, (val) => {
  emit('update:modelValue', {
    ...props.modelValue,
    commentsForTheEditors: val,
  })
})

const submissionStore = useSubmissionStore()

onMounted(async () => {

  emit('update:modelValue', {
    ...props.modelValue,
    
  })
})

</script>
