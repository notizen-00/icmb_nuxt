<template>
  <div class="multi-input">
    <div class="flex flex-wrap gap-2 mb-2">
      <span
        v-for="(item, index) in modelValue"
        :key="index"
        class="bg-blue-600 text-white px-2 py-1 rounded-full text-sm flex items-center"
      >
        {{ item }}
        <button type="button" class="ml-2" @click="removeItem(index)">×</button>
      </span>
    </div>
    <input
      type="text"
      v-model="input"
      @keydown="onKeyDown"
      placeholder="Type and press ; to adpd"
      class="w-full bg-gray-200  dark:bg-black text-black dark:text-white border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
</template>

<script setup lang="ts">
// Props
const props = defineProps<{
  modelValue: string[]
}>()

// Emits
const emit = defineEmits(['update:modelValue'])

const input = ref('')

function addItem() {
  const value = input.value.trim()
  if (value && !props.modelValue.includes(value)) {
    emit('update:modelValue', [...props.modelValue, value])
  }
  input.value = ''
}

function removeItem(index: number) {
  const updated = [...props.modelValue]
  updated.splice(index, 1)
  emit('update:modelValue', updated)
}

function onKeyDown(e: KeyboardEvent) {
  if (e.key === ';') {
    e.preventDefault()
    addItem()
  }
}
</script>
