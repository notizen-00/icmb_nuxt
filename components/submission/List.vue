<script lang="ts" setup>
import { cn } from '@/lib/utils'
import { formatDistanceToNow } from 'date-fns'


interface AbstractListProps {
  items: any[]
}

const props = defineProps<AbstractListProps>()

const selectedSubmissionData = defineModel<string>('selectedSubmissionData', { required: false })

function getBadgeVariantFromLabel(label:boolean) {
  if (!label) return 'default'
  if (label) return 'outline'
  return 'secondary'
}
</script>

<template>
  <ScrollArea class="h-[calc(100dvh-72px-56px-3rem-53px)] flex">
    <div class="flex flex-1 flex-col gap-2 p-4 pt-0">
      <TransitionGroup name="list" appear v-if="items.length > 0">
        <button
          v-for="item in items"
          :key="item.id"
          :class="cn(
            'flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent',
            selectedSubmissionData === item.id && 'bg-muted',
          )"
          @click="selectedSubmissionData = item.id.toString()"
        >
          <div class="w-full flex flex-col gap-1">
            <div class="flex items-center">
              <div class="flex items-center gap-2">
                
                <div class="font-bold">
               
                <i class="fal fa-signal-stream"></i> {{ item.team.name }}
                </div>
                <!-- <span
                  v-if="!item.read"
                  class="h-2 w-2 flex rounded-full bg-blue-600"
                /> -->
              </div>
            
              <div
                :class="cn(
                  'ml-auto text-xs ',
                  selectedSubmissionData === item.id ? 'text-foreground' : 'text-muted-foreground',
                )"
              >
                <span class="text-slate-100">{{ formatDistanceToNow(new Date(item.created_at), { addSuffix: true }) }}</span>
                <br>
              </br>
              
              <i class="fal fa-calendar-alt"></i> {{ new Date(item.created_at).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }) }}
              </div>
              <div>
            
              </div>
            </div>
              <div class="font-semibold flex ">
                  {{ item.manuscript_title }}
              </div>

            <div class="text-xs font-medium">
              {{ item.manusript_title }}
            </div>
          </div>
          <div class="line-clamp-2 text-xs text-muted-foreground">
            {{ item.corresponding_email.substring(0, 300) }}
          </div>
          <div class="flex items-end justify-between w-full gap-2">
            <div>
            <Badge variant="outline" class="ring-1 ring-green-500 text-green mr-2"  v-if="item.conference_type.type_participant != 'presenter'">
              {{ item.form_of_participation }}
            </Badge>
            <Badge variant="outline" class="ring-1 ring-blue-500 text-blue"  v-if="item.conference_type.type_participant != 'presenter'">
             <i class="fal fa-tag mr-2"></i> {{ item.conference_type.name }}
            </Badge>
            </div>
            <div></div>
            <Badge
              :variant="getBadgeVariantFromLabel(item.status)"
            >
              {{ item.status ? 'Active':'On Verification' }}
            </Badge>
          </div>
        </button>
      </TransitionGroup>

      <!-- Jangan pakai TransitionGroup untuk satu elemen statis -->
      <div v-else class="text-muted-foreground text-sm py-4 text-center min-h-full mt-20 flex justify-center items-center">

        <div class="mx-auto text-center">
        <img src="/no-data.gif" width="200" height="100" class="mx-auto"></img><br></br>
        No Conference Data.
        </div>
      </div>
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
