<script lang="ts" setup>
import type { Submission } from './data/submission.ts'
import { addDays, addHours, format, nextSaturday } from 'date-fns'
import { Archive, ArchiveX, ArrowLeft, Clock, Forward, MoreVertical, Reply, ReplyAll, Trash2 } from 'lucide-vue-next'
import { computed } from 'vue'
import type { Participant } from '~/interfaces/participant/Participant.js'

interface SubmissionDisplayProps {
  participant: any | undefined
}


const props = defineProps<SubmissionDisplayProps>()

console.log(props.participant)

const emit = defineEmits(['close'])



const today = new Date()
</script>

<template>
  <div class="h-full flex flex-col">
    
    <div class="flex items-center p-2">
      <div class="flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger as-child>
            <Button variant="ghost" size="icon" :disabled="!participant" @click="emit('close')">
              <ArrowLeft class="size-4" />
              <span class="sr-only">Back</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Back</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger as-child>
            <Button variant="ghost" size="icon" :disabled="!participant">
              <Archive class="size-4" />
              <span class="sr-only">Archive</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Archive</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger as-child>
            <Button variant="ghost" size="icon" :disabled="!participant">
              <ArchiveX class="size-4" />
              <span class="sr-only">Move to junk</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Move to junk</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger as-child>
            <Button variant="ghost" size="icon" :disabled="!participant">
              <Trash2 class="size-4" />
              <span class="sr-only">Move to trash</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Move to trash</TooltipContent>
        </Tooltip>
        <Separator orientation="vertical" class="mx-1 h-6" />
        <Tooltip>
          <Popover>
            <PopoverTrigger as-child>
              <TooltipTrigger as-child>
                <Button variant="ghost" size="icon" :disabled="!participant">
                  <Clock class="size-4" />
                  <span class="sr-only">Snooze</span>
                </Button>
              </TooltipTrigger>
            </PopoverTrigger>
            <PopoverContent class="w-full flex p-0">
              <div class="flex flex-col gap-2 border-r px-2 py-4">
                <div class="px-4 text-sm font-medium">
                  Snooze until
                </div>
                <div class="grid min-w-[250px] gap-1">
                  <Button
                    variant="ghost"
                    class="justify-start font-normal"
                  >
                    Later today
                    <span class="ml-auto text-muted-foreground">
                      {{ format(addHours(today, 4), "E, h:m b") }}
                    </span>
                  </Button>
                  <Button
                    variant="ghost"
                    class="justify-start font-normal"
                  >
                    Tomorrow
                    <span class="ml-auto text-muted-foreground">
                      {{ format(addDays(today, 1), "E, h:m b") }}
                    </span>
                  </Button>
                  <Button
                    variant="ghost"
                    class="justify-start font-normal"
                  >
                    This weekend
                    <span class="ml-auto text-muted-foreground">
                      {{ format(nextSaturday(today), "E, h:m b") }}
                    </span>
                  </Button>
                  <Button
                    variant="ghost"
                    class="justify-start font-normal"
                  >
                    Next week
                    <span class="ml-auto text-muted-foreground">
                      {{ format(addDays(today, 7), "E, h:m b") }}
                    </span>
                  </Button>
                </div>
              </div>
              <div class="p-2">
                <Calendar />
              </div>
            </PopoverContent>
          </Popover>
          <TooltipContent>Snooze</TooltipContent>
        </Tooltip>
      </div>
      <div class="ml-auto flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger as-child>
            <Button variant="ghost" size="icon" :disabled="!participant">
              <Reply class="size-4" />
              <span class="sr-only">Reply</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Reply</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger as-child>
            <Button variant="ghost" size="icon" :disabled="!participant">
              <ReplyAll class="size-4" />
              <span class="sr-only">Reply all</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Reply all</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger as-child>
            <Button variant="ghost" size="icon" :disabled="!participant">
              <Forward class="size-4" />
              <span class="sr-only">Forward</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Forward</TooltipContent>
        </Tooltip>
      </div>
      <Separator orientation="vertical" class="mx-2 h-6" />
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="ghost" size="icon" :disabled="!participant">
            <MoreVertical class="size-4" />
            <span class="sr-only">More</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Mark as unread</DropdownMenuItem>
          <DropdownMenuItem>Star thread</DropdownMenuItem>
          <DropdownMenuItem>Add label</DropdownMenuItem>
          <DropdownMenuItem>Mute thread</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
    <Separator />
    <div v-if="participant" class="flex flex-1 flex-col">
      <div class="flex items-start p-4">
        <div class="flex items-start gap-4 text-sm">
        <Avatar>
            <AvatarFallback>
              {{ participant.corresponding_author?.slice(0, 3).toUpperCase() }}
            </AvatarFallback>
        </Avatar>
          <div class="grid gap-1">
            <div class="font-semibold">
            {{ participant.manuscript_title }}
            </div>
            <div class="line-clamp-1 text-xs">
              {{ participant.corresponding_author }}
            </div>
            <div class="line-clamp-1 text-xs">
              <span class="font-medium">Reply-To:</span> {{ participant.corresponding_email }}
            </div>
          </div>
        </div>
        <div v-if="participant.created_at" class="ml-auto text-xs text-muted-foreground">
          {{ format(new Date(participant.created_at), "PPpp") }}
        </div>
      </div>
      <Separator />
      <div class="flex-1 whitespace-pre-wrap p-4 text-sm">
        {{ participant.manuscript_title }}
      </div>
      <Separator class="mt-auto" />
      <div class="p-4">
        <form>
          <div class="grid gap-4">
            <Textarea
              class="p-4"
              :placeholder="`Reply ${participant.conference_type.name}...`"
            />
            <div class="flex items-center">
              <Label
                html-for="mute"
                class="flex items-center gap-2 text-xs font-normal"
              >
                <Switch id="mute" aria-label="Mute thread" /> Mute this
                thread
              </Label>
              <Button
                type="button"
                size="sm"
                class="ml-auto"
              >
                Send
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div v-else class="p-8 text-center text-muted-foreground">
      No message selected
    </div>
  </div>
</template>
