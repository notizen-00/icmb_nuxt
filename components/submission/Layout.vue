<script lang="ts" setup>
import type { UserParticipant } from '@/interfaces/participant'
import type { LinkProp } from '~/components/submission/Nav.vue'
import { useMediaQuery } from '@vueuse/core'
import { Search, File, FileSearch, FileCog, User } from 'lucide-vue-next'
import { ConfigProvider } from 'radix-vue'
import { cn } from '~/lib/utils'

const props = withDefaults(defineProps<SubmissionProps>(), {
  defaultCollapsed: false,
  defaultLayout: () => [18, 82],
  participant: () => ({
    id: 0,
    name: '',
    email: '',
    email_verified_at: null,
    is_admin: 0,
    created_at: '',
    updated_at: '',
    access: '',
    submission:{} as any,
    participant: [],
    participant_payment: [],
    team: [],
  }),
})

const useIdFunction = () => useId()

interface SubmissionProps {
  accounts: {
    label: string
    email: string
    icon: string
  }[]
  participant: UserParticipant
  defaultLayout?: number[]

  defaultCollapsed?: boolean
  navCollapsedSize: number
}

const isCollapsed = ref(props.defaultCollapsed)
const searchValue = ref('')
const debouncedSearch = refDebounced(searchValue, 250)
const selectedSubmission = ref<string | undefined>()
const selectedSubmissionData = computed(() => {
  if (!props.participant?.participant) return null
  return props.participant.participant.find(
    (item: any) => item.id?.toString() === selectedSubmission.value
  ) || null
})

const submissionStore = useSubmissionStore();
const activeTab = ref('my submission')

const links: LinkProp[] = [
  { title: 'My Submission', label: '1', icon: File, variant: 'default' },
  { title: 'Contributor', label: '1', icon: User, variant: 'ghost' },
]
const isLoading = ref(false)

const reviewerCount = computed(() => {
  const participants = submissionStore.detailSubmission?.submission_participant ?? []
  return participants.filter(
    (participant: { user?: { access?: string } }) => participant.user?.access === 'reviewer'
  ).length
})


// onMounted(async () => {
//   isLoading.value = true

//   try {
//     const submissionStore = useSubmissionStore()
//     await submissionStore.fetchDetail()
//   } catch (error) {
//     console.error('Gagal memuat detail submission:', error)
//   } finally {
//     isLoading.value = false
//   }
// })

const defaultCollapse = useMediaQuery('(max-width: 768px)')

watch(() => defaultCollapse.value, () => {
  isCollapsed.value = defaultCollapse.value
})

function onCollapse() {
  isCollapsed.value = true
}

function onExpand() {
  isCollapsed.value = false
}
</script>

<template>
  <ConfigProvider :use-id="useIdFunction">
    <TooltipProvider :delay-duration="0">
      <ResizablePanelGroup
        id="resize-panel-group-1"
        direction="horizontal"
        class="h-full max-h-[calc(100dvh-53px-3rem)] items-stretch"
      >
        <ResizablePanel
          id="resize-panel-1"
          :default-size="defaultLayout[0] "
          :collapsed-size="navCollapsedSize"
          collapsible
          :min-size="15"
          :max-size="20"
          :class="cn(isCollapsed && 'min-w-[50px] transition-all duration-300 ease-in-out')"
          @expand="onExpand"
          @collapse="onCollapse"
        >
          <div :class="cn('flex h-[56px] items-center justify-center', isCollapsed ? 'h-[56px]' : 'px-2')">
            <SubmissionAccountSwitcher :is-collapsed="isCollapsed" :accounts="accounts" />
          </div>
          <Separator />
          <div class="p-2 space-y-1">
            <button
              v-for="link in links"
              :key="link.title"
              @click="activeTab = link.title.toLowerCase()"
              :class="cn(
                'w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium justify-between',
                activeTab === link.title.toLowerCase() ? 'bg-accent text-accent-foreground' : 'hover:bg-muted'
              )"
            >
              <div class="flex items-center gap-2">
                <component :is="link.icon" class="w-7 h-4" />
                <span v-if="!isCollapsed">{{ link.title }}</span>
              </div>
              <span
                v-if="!isCollapsed && link.label"
                class="ml-auto text-xs bg-muted text-muted-foreground px-1.5 py-0.5 rounded-full"
              >
                {{ link.label }}
              </span>
            </button>
          </div>
        </ResizablePanel>

        <ResizableHandle id="resize-handle-1" with-handle />
        <div class="overflow-y-auto w-4/5">
        <ResizablePanel id="resize-panel-2" class="overflow-y-auto" :default-size="defaultLayout[1]" :min-size="30">
          <SubmissionDisplay
            v-if="selectedSubmissionData"
            :participant="selectedSubmissionData"
            @close="selectedSubmission = ''"
          />

          <div v-else>
            <Tabs v-if="activeTab === 'my submission'" default-value="all">
             <div class="flex items-center px-4 py-2 overflow-y-auto">
            <h1 class="text-xl font-bold">Submissions</h1>

              <div class="ml-auto flex items-center space-x-4">
                  <!-- Badge Reviewer -->
                  <span class="inline-flex items-center px-2 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
                  <i class="fal fa-user mr-1"></i> /
                    {{ reviewerCount }}
              </span>
      <!-- Status Badge -->
             <BaseBadgeStatus :status="participant?.submission?.status ?? 'draft'" />

            <button @click="submissionStore.fetchDetail()" class="ring-1 ring-red-400 py-1 px-2 rounded-2 text-sm text-red-500"><i :class="submissionStore.isLoading ? 'fa-spin':''" class="fal fa-refresh text-red-400"></i> Refresh</button> 

          </div>
          </div>
              <Separator />
             
              <SubmissionFormPublication
                  v-if="participant?.submission?.status === 'incomplete'"
                      :submission="participant.submission"
              />

              <WorkflowLayout v-else />

             
            </Tabs>

            <div v-else-if="activeTab === 'review'" class="p-4"><SubmissionPartialReview></SubmissionPartialReview></div>
            <div v-else-if="activeTab === 'editor'" class="p-4">📝 Editor's dashboard.</div>
            <div v-else-if="activeTab === 'contributor'" class="p-4">👥 Contributor content here.</div>
          </div>
        </ResizablePanel>
        </div>
      </ResizablePanelGroup>
    </TooltipProvider>
  </ConfigProvider>
</template>
