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
    <div class="flex-1 flex flex-col gap-2 p-4 pt-0">
      <TransitionGroup name="list" appear v-if="items.length > 0">
        <button
          v-for="item in items"
          :key="item.id"
          :class="cn(
            'flex flex-col gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent',
            selectedSubmissionData === item.id && 'bg-muted'
          )"
          @click="selectedSubmissionData = item.id.toString()"
        >
          <div class="w-full flex flex-col gap-2 sm:gap-1">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
              <div class="flex items-center gap-2 text-sm font-bold">
                <a
                  :href="'http://icmb-app.test/site/' + item.team.slug"
                  target="_blank"
                  class="hover:underline"
                  @click.stop
                >
                  <i class="fal fa-signal-stream mr-1"></i> {{ item.team.name }}
                </a>
              </div>
    
              
              <div
                :class="cn(
                  'text-xs text-right',
                  selectedSubmissionData === item.id ? 'text-foreground' : 'text-muted-foreground'
                )"
              >
                <span class="block text-slate-400">{{ formatDistanceToNow(new Date(item.created_at), { addSuffix: true }) }}</span>
                <span class="block text-slate-500">
                  <i class="fal fa-calendar-alt mr-1"></i>
                  {{ new Date(item.created_at).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }) }}
                </span>
              </div>
            </div>

            <div class="text-sm font-semibold text-wrap break-words">
              {{ item.manuscript_title }}
            </div>

            <div class="text-xs text-muted-foreground break-words">
              <span class="text-white">{{ item.corresponding_author }}</span> /  {{ item.form_of_participation }}
            </div>
          </div>

          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mt-2">
            <div class="flex flex-wrap items-center gap-2 text-xs">

              <Badge
                variant="outline"
                class="ring-1 ring-blue-500 text-blue-600"
              >
                <i class="fal fa-tag mr-1"></i> {{ item.conference_type.name }}
              </Badge>
                
            </div>
                   

            <Badge
              :variant="getBadgeVariantFromLabel(item.status)"
              :class="item.status ? 'text-green-600 ring-1 ring-green-600' : 'text-black ring-black'"
              class="w-fit"
            >
              {{ item.status ? 'Approved' : 'On Verification' }}
            </Badge>
          </div>
        </button>
      </TransitionGroup>

      <div
        v-else
        class="text-muted-foreground text-sm py-4 text-center min-h-full mt-20 flex justify-center items-center"
      >
        <div class="mx-auto text-center">
          <img src="/no-data.gif" width="200" height="100" class="mx-auto mb-2" />
          <p>No Conference Data.</p>
        </div>
      </div>
    </div>
  </ScrollArea>
</template>
