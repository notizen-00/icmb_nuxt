<template>
  <span
    class="inline-flex items-center px-3 py-1 text-xs font-medium border rounded-full"
    :class="badgeClass"
  >
    <i class="w-2 h-2 mr-3" :class="dotClass"></i>
    {{ getLabel }}
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  status: String,
})

const badgeClass = computed(() => {
  switch (props.status) {
    case 0:
      return 'border-orange-500 text-orange-500'
    case 1:
      return 'border-green-500 text-green-500'
    case 2:
      return 'border-red-500 text-red-500'
    case 3:
      return 'border-blue-500 text-blue-500'
    default:
      return 'border-gray-500 text-gray-500'
  }
})

const getLabel = computed(()=>{
    switch(props.status){
        case 0:
            return 'Pending Payment'
        case 1:
            return 'Settlement'
        case 2:
            return 'Declined'
        case 3:
            return 'On Verification'
        default:
            return 'Unknown'
    }
})

const dotClass = computed(() => {
  switch (props.status) {
    case 0:
      return 'fal fa-money-bill-transfer'
    case 1:
      return 'fal fa-money-check'
    case 2:
      return 'fal fa-circle-xmark'
    case 3:
      return 'fal fa-money-from-bracket'
    default:
      return 'bg-gray-500'
  }
})
</script>

<style scoped>
/* optional: biar dot lebih mirip contohmu */
span > span {
  display: inline-block;
}
</style>
