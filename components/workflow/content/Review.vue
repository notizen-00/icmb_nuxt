<script setup>


const submissionStore = useSubmissionStore()
const discussionStore = useDiscussionStore();
const showModal = ref(discussionStore.isLoading);
const user = { id: 123 }      // Ganti sesuai data
const submission = { id: submissionStore.detailSubmission.submission.id, team_id: submissionStore.detailSubmission.submission.team_id } // Ganti sesuai data

function onDiscussionAdded(discussion) {
  console.log('Discussion added', discussion)
  // lakukan refresh list or push ke array
}

const revisionFiles = computed(() => 
  (submissionStore.detailSubmission?.submission_files?.items || [])
    .filter(item => item.fileStage === 15)
);


const activeStage = computed(() => {
  return submissionStore.detailSubmission.submission_data.stages.find(stage => stage.isActiveStage)
})

const roundStatus = computed(() => {
  return activeStage.value?.status || 'Unknown stage status'
})

onMounted(async()=>{
    await discussionStore.fetchDetail(submissionStore.detailSubmission.submission.id)


})

const {data} = useAuth()
</script>

<template>
  <div>
    <h2 class="text-lg font-semibold mb-2">Round 1 Status</h2>
    <div class="border-l-5 border-blue-500 p-4 rounded mb-6">
      <p class="font-medium">{{ roundStatus }}</p>
    </div>

    <div class="mb-6">
      <h3 class="font-semibold mb-2"><i class="fal fa-bell"></i> Notifications</h3>
      <ul class="space-y-2 text-blue-600 underline" v-for="decision in submissionStore.detailSubmission.decision" :key="decision.id">
        <li>
          <span>{{ decision.description }}</span>
          <span class="text-sm text-gray-500 float-right">{{ formatDate(decision.dateDecided) }}</span>
        </li>
    
      </ul>
    </div>

    <div class="mb-6">
      <h3 class="font-semibold mb-2">Reviewer's Attachments</h3>
      <div class="italic text-gray-500">No Files</div>
    </div>

    <div class="mb-6">
      <div class="flex justify-between">
        <h3 class="font-semibold text-lg mb-2">Revisions</h3>
        <button @click.prevent="submissionStore.toggleDialogRevision()" class="ring-1 ring-blue-400 py-1 px-2 rounded-3 text-blue hover:bg-blue-700 hover:text-white">
          Upload File
        </button>
      </div>
      
      <div class="flex items-center item-center mx-5">
           <ul
      v-if="revisionFiles.length"
      class="mb-6 w-full divide-y border rounded mt-10"
    >
      <li
        v-for="file in revisionFiles"
        :key="file.filesId"
        class="flex items-center justify-between p-3"
      >
        <a
          class="text-blue-600 underline"
          target="_blank"
          :href="file.url"
        >
          {{ file.name?.en || 'Untitled' }}
        </a>
        <div class="flex items-center space-x-3">
          <span class="text-sm text-pink-600">
            {{ formatDate(file.createdAt) }}
          </span>
          <span class="ring-1 ring-red-300 py-1 px-2 rounded-lg text-xs text-red">
            Revision File
          </span>
          <span
            v-if="file.genreName?.en"
            class="ring rounded-2 py-1 px-2 text-xs ring-blue-300"
          >
            {{ file.genreName.en }}
          </span>
        </div>
      </li>
    </ul>

           <div v-else class="italic text-gray-500 my-20 flex text-center w-full justify-center items-center">No Files</div>
      </div>
    </div>

    <div>
      <div class="flex justify-between">
      <h3 class="font-bold mb-2 text-xl ">Review Discussions</h3>
      <button class="ring-1 ring-blue-400 py-1 px-2 rounded-2 text-blue-400 mb-2" @click="discussionStore.toggleDialog()">Add Discussion</button>
      </div>
      <table class="w-full text-sm text-left border rounded">
        <thead class="bg-white dark:bg-black">
          <tr>
            <th class="px-4 py-2">Discussion</th>
            <th class="px-4 py-2">Owner</th>
            <th class="px-4 py-2">Description</th>
            <th class="px-4 py-2">Replies</th>
            <th class="px-4 py-2">Created At</th>
            <th class="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="i in discussionStore.detailDiscussion">
            <td class="px-4 py-2">{{ i.discussion_name }}</td>
            <td class="px-4 py-2">{{ i.owner.name }}</td> 
            <td class="px-4 py-2">{{ i.description }}</td>
            <td class="px-4 py-2">{{ i.details.length }}</td>
            <td class="px-4 py-2">{{ formatDate(i.created_at) }}</td>
            <td class="px-4 py-2">
              <div v-if="i.owner_id == data.id">
                <button class="mr-2 "><i class="fal fa-trash text-red"></i></button>
                <button class="mr-2"><i class="fal fa-eye text-blue-200"></i></button>
                <button><i class="fal fa-paper-plane text-blue-400"></i></button>
              </div>
              <div v-else>
                 <button class="mr-2"><i class="fal fa-eye text-blue-200"></i></button>
                <button><i class="fal fa-paper-plane text-blue-400"></i></button>
                
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <WorkflowDialogAddDiscussion
    v-if="discussionStore.isDialog"
    :submissionId="submission.id"
    :teamId="submission.team_id"
    stage="review"
    @close="showModal = false"
    @submitted="onDiscussionAdded"
  />

  <WorkflowDialogUploadRevision
    v-if="submissionStore.isDialogRevision"
    :submissionId="submission.id"
    :teamId="submission.team_id"
    stage="review"
    @close="showModal = false"
    @submitted="onDiscussionAdded"
  />
</template>


