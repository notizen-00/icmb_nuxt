
<template>
  <div class="space-y-8">
    <div class="border rounded">
      <div class="flex justify-between items-center border-b p-3 font-medium text-black bg-slate-100">
        <span>Details</span>
        <button class="border px-3 py-1 rounded text-sm hover:bg-gray-100">Edit</button>
      </div>
      <div class="p-3 space-y-2 text-sm">
        <div>
          <div class="font-semibold">Title</div>
          <div>{{ modelValue[0].title || 'None provided' }}</div>
        </div>
        <div>
          <div class="font-semibold">Keywords</div>
          <div>{{ modelValue[0].keywords || 'None provided' }}</div>
        </div>
        <div class="min-h-[400px] max-h-[400px] overflow-y-auto border rounded p-2"> 
          <div class="font-semibold ">Abstract </div>
            <!-- <DragonEditorViewer :content="modelValue[0].abstract" />
              -->
            <textarea v-model="modelValue[0].abstract" readonly class="w-full p-2 dark:bg-black h-100 dark:text-white min-h-[200] max-h-[400px]" />
          <!-- <div v-if="modelValue[0].abstract?.length > 0">
            {{ modelValue[0].abstract[0]?.textContent || 'None provided' }}
          </div>
          <div v-else class="text-pink-600 border border-pink-400 rounded p-2 mt-1">
            <p class="flex items-center gap-1 text-xs font-medium"><span>⚠</span> This field is required.</p>
          </div> -->
        </div>
      </div>
    </div>

    <div class="border rounded">
      <div class="flex justify-between items-center border-b p-3 font-medium text-black bg-slate-100">
        <span>Files</span>
        <button class="border px-3 py-1 rounded text-sm hover:bg-gray-100">Edit</button>
      </div>
      <div class="p-3 space-y-2 text-sm">
        <div v-for="file in modelValue[1].files" :key="file.name.en" class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="text-blue-500">📄</span>
            <span>{{ file.name.en }}</span>
          </div>
          <span class="text-xs border rounded-full px-2 text-blue-200 py-0.5">{{ file.genreName.en }}</span>
        </div>
      </div>
    </div>

    <div class="border rounded">
      <div class="flex justify-between items-center border-b p-3 font-medium text-black bg-slate-100">
        <span>Contributors</span>
        <button class="border px-3 py-1 rounded text-sm hover:bg-gray-100">Edit</button>
      </div>
      <div class="p-3 space-y-2 text-sm">
        <div v-for="contributor in modelValue[2].contributors" :key="contributor.fullName" class="flex justify-between">
          <div class="text-lg">{{ contributor.fullName }} <br><span class="text-xs text-slate-400">{{ contributor.affiliation.en }}</span></div>
          <div class="flex items-center gap-1">
            <span v-if="contributor.id" class="text-xs bg-blue-600 text-white px-2 py-0.5 rounded">Primary Contact</span>
            <span class="text-xs border rounded px-2 py-0.5">{{ contributor.userGroupName.en }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="border rounded">
      <div class="flex justify-between items-center border-b p-3 font-medium text-black bg-slate-100">
        <span>For the Editors</span>
        <button class="border px-3 py-1 rounded text-sm hover:bg-gray-100">Edit</button>
      </div>
      <div class="p-3 text-sm text-gray-700">
   
        <textarea v-model="modelValue[3].commentsForTheEditors" readonly class="w-full dark:bg-black dark:text-white text-black min-h-[200]" />
      </div>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  modelValue: {
    type: Array,
    required: true,
  },
})


</script>
