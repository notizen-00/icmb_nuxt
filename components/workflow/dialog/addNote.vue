<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white dark:bg-gray-800 rounded-lg w-full max-w-xl p-6 space-y-4">
      <h2 class="text-lg font-semibold">Add Note Discussion {{ stage }}</h2>

      <form @submit.prevent="submitDiscussion" class="space-y-4">
        <div>
          <label class="block font-medium mb-1">Note</label>
          <input type="text" v-model="form.discussion_name" required
                 class="w-full border rounded px-3 py-2 bg-gray-50 dark:bg-gray-700 text-black dark:text-white" />
        </div>

        <div>
          <label class="block font-medium mb-1">Description</label>
          <textarea v-model="form.description" rows="3" required
                    class="w-full border rounded px-3 py-2 bg-gray-50 dark:bg-gray-700 text-black dark:text-white"></textarea>
        </div>

        <div class="flex space-x-4">
          <button type="submit"
                  class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Send Note
          </button>
        </div>
      </form>

      <p v-if="error" class="text-sm text-red-500">{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { reactive, toRefs } from 'vue'
const props = defineProps({
  submissionId: { type: Number, required: true },
  teamId: { type: Number, required: true },
  stage: { type: String, required: true }, // e.g. 'review', 'copyedited'
})

const discussionStore = useDiscussionStore();
const emits = defineEmits(['close', 'submitted'])



const isOpen = ref(discussionStore.isDialogNote)
const error = ref('')
const form = reactive({
  discussion_name: '',
  description: '',
  status: true,
  submission_id: props.submissionId,
  team_id: props.teamId,
  stage: props.stage,
})

function closeModal() {
  discussionStore.toggleDialog();
//   emits('close')
}




async function submitDiscussion() {

    console.log(form);
   await discussionStore.create(form);

}
</script>

<style scoped>
/* Optional styling */
</style>
