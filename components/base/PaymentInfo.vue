<template>
  <div class="border rounded-md p-4 shadow-sm bg-black max-w-md ">
    <table class="w-full text-sm text-left border-collapse">
      <tbody>
        <tr class="border-b">
          <td class="py-2 font-semibold w-1/3">VA Number</td>
          <td class="py-2">: {{ vaNumber }}</td>
        </tr>
        <tr class="border-b">
          <td class="py-2 font-semibold">Expired Untill</td>
          <td class="py-2">: {{  }}</td>
        </tr>
        <tr>
          <td class="py-2 font-semibold">Name</td>
          <td class="py-2">: {{ name }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  vaNumber: string
  billingId: string
  name: string
}>()
</script>
