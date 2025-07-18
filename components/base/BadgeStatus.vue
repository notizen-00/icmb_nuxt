<template>
  <span
    class="inline-flex items-center px-3 py-1 text-xs font-medium border rounded-full"
    :class="badgeClass"
  >
    <span class="w-2 h-2 mr-1 rounded-full" :class="dotClass"></span>
    {{ status }}
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  status: String,
})

const badgeClass = computed(() => {
  switch (props.status) {
    case 'review':
      return 'border-orange-500 text-orange-500'
    case 'copyediting':
      return 'border-sky-500 text-sky-500'
    case 'production':
      return 'border-emerald-500 text-emerald-500'
    case 'incomplete':
      return 'border-red-500 text-red-500'
    case 'submission':
      return 'border-pink-500 text-pink-500'
    default:
      return 'border-gray-500 text-gray-500'
  }
})

const dotClass = computed(() => {
  switch (props.status) {
    case 'review':
      return 'bg-orange-500'
    case 'copyediting':
      return 'bg-sky-500'
    case 'production':
      return 'bg-emerald-500'
    case 'incomplete':
      return 'bg-red-500'
    case 'submission':
      return 'bg-pink-500'
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
