<template>
  <div class="border-b mb-4">
    <nav class="flex space-x-6">
      <button
        v-for="tab in tabs"
        :key="tab.label"
        :disabled="!tab.isActiveStage"
        @click="tab.isActiveStage && $emit('changeTab', tab.label)"
        :class="[
          'px-4 py-2 text-sm font-medium',
          tab.label === activeTab
            ? 'border-b-2 border-blue-600 text-blue-600'
            : tab.isActiveStage
              ? 'text-gray-600 hover:text-blue-500'
              : 'text-gray-400 cursor-not-allowed'
        ]"
      >
        {{ tab.label }}
      </button>
    </nav>
  </div>
</template>

<script setup>
defineProps({
  activeTab: String,
  tabs: Array
})
defineEmits(['changeTab'])
</script>
