<script lang="ts" setup>
import type { UserParticipant } from "@/interfaces/participant";
import { Search } from "lucide-vue-next";
import { useMediaQuery } from "@vueuse/core";
import { ConfigProvider } from "radix-vue";
import { cn } from "~/lib/utils";

const props = withDefaults(defineProps<SubmissionProps>(), {
  participant: () => ({
    id: 0,
    name: "",
    email: "",
    email_verified_at: null,
    is_admin: 0,
    created_at: "",
    updated_at: "",
    access: "",
    submission: {} as any,
    participant: [],
    participant_payment: [],
    team: [],
  }),
  submissionParticipant: [],
});

interface SubmissionProps {
  participant: UserParticipant;
  submissionParticipant: any;
}

const useIdFunction = () => useId();
const searchValue = ref("");
const debouncedSearch = refDebounced(searchValue, 250);
const selectedSubmission = ref<string | undefined>();
const activeTypeTab = ref("Submission");

const tabOptions = [
  { label: "Submission", isActiveStage: true },
  { label: "Publication", isActiveStage: true },
];

function onTabChange(newTab: any) {
  activeTypeTab.value = newTab;
}

const filteredParticipantList = computed(() => {
  const keyword = debouncedSearch.value?.trim().toLowerCase() || '';
  let filtered = [...props.submissionParticipant];

  if (keyword) {
    filtered = filtered.filter((item: any) => {
      return (
        (item.participant.manuscript_title ?? '').toLowerCase().includes(keyword) ||
        (item.participant.corresponding_email ?? '').toLowerCase().includes(keyword)
      );
    });
  }

  return filtered;
});

const selectedSubmissionData = computed(() => {
  if (!props.submissionParticipant) return null;
  return props.submissionParticipant.find(
    (item: any) => item.id?.toString() === selectedSubmission.value
  ) || null;
});

const submissionStore = useSubmissionStore();
</script>
<template>
  <SubmissionDisplay
    v-if="selectedSubmissionData"
    :participant="selectedSubmissionData"
    @close="selectedSubmission = ''"
  />
  <ConfigProvider :use-id="useIdFunction" v-else>
    <div class="h-full max-h-[calc(100dvh-53px-3rem)] overflow-y-auto px-4 py-2 sm:px-6 sm:py-4">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
        <h1 class="text-lg sm:text-xl font-bold">List Journal</h1>
        <div class="flex flex-wrap items-center gap-2">

          <button
            @click="submissionStore.fetchSubmission()"
            class="border border-b-4 border-r-4 border-red-500 active:border-b active:border-r active:translate-y-[2px] transition duration-150 ease-in-out py-1 px-3 rounded-md text-sm text-red-500"
          >
            <i
              :class="['fal fa-refresh text-red-400', submissionStore.isLoading ? 'fa-spin' : '']"
            ></i>
            <span class="ml-1">Refresh</span>
          </button>
        </div>
      </div>

      <Separator class="my-3" />

      <!-- Tabs -->
      <div class="flex justify-center mb-3">
        <BaseTab
          :tabs="tabOptions"
          :activeTab="activeTypeTab"
          @changeTab="onTabChange"
        />
      </div>

      <!-- Search -->
      <div
        class="bg-background/95 p-3 rounded-md backdrop-blur supports-[backdrop-filter]:bg-background/60"
      >
        <form>
          <div class="relative">
            <Search class="absolute left-3 top-3 size-4 text-muted-foreground" />
            <Input
              v-model="searchValue"
              placeholder="Search..."
              class="pl-10 py-2 text-sm w-full rounded-md border"
            />
          </div>
        </form>
      </div>

      <!-- List -->
      <div class="mt-4">
        <JournalList
          v-model:selected-submission-data="selectedSubmission"
          :items="filteredParticipantList"
        />
      </div>
    </div>
  </ConfigProvider>
</template>
