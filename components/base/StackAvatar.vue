<template>
    <span class="p-3 pb-2 my-2 mb-2">Authors</span>

  <div class="flex -space-x-3">
    <img
      v-for="(name, index) in item"
      :key="index"
      class="w-10 h-10 rounded-full border-2 border-white object-cover"
      :src="getAvatarUrl(name)"
      :alt="name"
      :title="name"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})

// Ambil inisial 2 huruf dari nama lengkap
function getInitials(name) {
  const parts = name.trim().split(' ')
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase()
  }
  return (parts[0][0] + parts[1][0]).toUpperCase()
}

function getAvatarUrl(name) {
  const initials = getInitials(name)
  return `https://placehold.co/40x40?text=${initials}`
}
</script>
