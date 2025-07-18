<script lang="ts" setup>
import type { Submission } from './data/submission.ts'
import { cn } from '@/lib/utils'
import { formatDistanceToNow } from 'date-fns'
import type { Participant } from '~/interfaces/participant/Participant.js'
import type { UserParticipant } from '~/interfaces/participant/User.js'

interface SubmissionListProps {
  item: UserParticipant 
}

const props = defineProps<SubmissionListProps>()
const selectedSubmission = defineModel<string>('selectedSubmission', { required: false })

function getBadgeVariantFromLabel(label: string) {
  if (['work'].includes(label.toLowerCase())) return 'default'
  if (['personal'].includes(label.toLowerCase())) return 'outline'
  return 'secondary'
}
</script>

<template>
  <ScrollArea class="h-[calc(100dvh-72px-56px-3rem-53px)] flex">
    <div class="flex flex-1 flex-col gap-2 p-4 pt-0">
      <button
        :class="cn(
          'flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent',
          selectedSubmission === item.participant[0].id.toString() && 'bg-muted',
        )"
        @click="selectedSubmission = item.participant[0].id.toString()"
      >
      <div class="flex"><i class="fal fa-file"></i></div>
        <div class="w-full flex flex-col gap-1">
          
          <div class="flex items-center">
            
            <div class="flex items-center gap-2">
              <div class="font-semibold">  Manuscript Title : {{ item.participant[0].manuscript_title }}</div>
              <span v-if="!item.is_admin" class="h-2 w-2 flex rounded-full bg-blue-600" />
            </div>
            <div
              :class="cn(
                'ml-auto text-xs',
                selectedSubmission === item.participant[0].id.toString()
                  ? 'text-foreground'
                  : 'text-muted-foreground'
              )"
            >
              {{ formatDistanceToNow(new Date(item.created_at), { addSuffix: true }) }}
            </div>
          </div>

          <div class="text-xs font-medium"><i class="fal fa-user-graduate mx-3"></i>{{ item.participant[0].corresponding_author }}</div>
        </div>
        <div class="line-clamp-2 text-xs text-muted-foreground">{{ item.participant[0].affiliation.substring(0, 300) }}</div>
        <div class="flex items-center gap-2">
          <!-- <Badge
            v-for="label of item.labels"
            :key="label"
            :variant="getBadgeVariantFromLabel(label)"
          >
            {{ label }}
          </Badge> -->
        </div>
      </button>
    </div>
  </ScrollArea>
</template>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(15px);
}

.list-leave-active {
  position: absolute;
}
</style>
