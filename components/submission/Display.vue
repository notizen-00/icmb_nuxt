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

const fileUrl = computed(() =>
  props.participant.participant_payment.payment_file
    ? `${useRuntimeConfig().public.ServerUrl}/storage/${props.participant.participant_payment.payment_file}`
    : '#'
)

const statusText = computed(() =>
  props.participant.participant_payment.status === 1 ? 'Settlement' : 'On Verification'
)

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
              <span class="font-medium">Email</span> {{ participant.corresponding_email }}
            </div>
            <div class="mt-2 h-1 text-lg">
            <i class="fal fa-signal-stream text-blue"></i> {{ participant.team.name }}
            </div>
             <div class="mx-1 mt-10"><BaseStackAvatar v-if="participant.conference_type.type_participant == 'presenter'" :item="participant.author"></BaseStackAvatar></div>
          </div>
        </div>
        <div v-if="participant.created_at" class="ml-auto text-xs text-muted-foreground">
          {{ format(new Date(participant.created_at), "PPpp") }}
        </div>
      
      </div>
        <div class="flex w-full justify-end p-3">
        
          <Badge
            color="green"
            class="ring-1 ring-green"
              variant="outline"
            >
              {{ participant.status ? 'Approved':'On Verification' }}
            </Badge>
        </div>
      <Separator />
      <div class="flex-1 whitespace-pre-wrap p-4 text-sm">
        
        <BaseTicketParticipant :participant="participant" v-if="participant.status == 1"></BaseTicketParticipant>
       
      </div>
      <Separator class="mt-auto" />
      <div class="p-4">
        <div>
          <div class="flex w-full justify-between">
        <h1>Payment Information</h1>
        <SubmissionDialogCreatePayment :participant="participant" v-if="participant.participant_payment == null"></SubmissionDialogCreatePayment>
        </div>

    <h4 class="text-slate-400 text-xs mb-4">
      To proceed with the verification process, please make the payment to the Virtual Account below and upload the payment proof.  
    </h4>


         <BasePaymentInfo 
          vaNumber="9881151569300012"
          billingId="9881151569300012"
          name="Penerimaan dana FEB"></BasePaymentInfo>
      </div>  

    <div
  v-if="participant.participant_payment == null"
  class="flex flex-col justify-center items-center text-center mx-auto h-100"
>
  <img src="/no-data.gif" width="200" class="mb-2" />
  <span>No Payment Found</span>
</div>

      <div v-else>
       <div
    class="flex flex-col sm:flex-row mt-10 sm:items-center justify-between bg-zinc-800 text-white rounded-xl shadow-md p-4 gap-4"
  >
    <!-- Payment Info -->
    <div class="flex-1">
      <div class="text-sm font-semibold">
        Transaction Code: {{ participant.participant_payment.transaction_code }}
      </div>
      <div class="text-xs text-gray-400">
        Amount: {{ formatCurrency(participant.participant_payment.amount) }}
      </div>
      <div class="text-xs text-gray-400">
        Created at: {{ formatDate(participant.participant_payment.created_at) }}
      </div>
    </div>

    <!-- Payment File -->
   <div v-if="participant.participant_payment.payment_file" class="flex-shrink-0">
      <div class="w-24 h-24 overflow-hidden rounded-md border border-gray-600">
        <img
          
          :src="fileUrl"
          alt="Payment Proof"
          class="object-cover w-full h-full"
        />
         <a
          :href="fileUrl"
          target="_blank"
          class="text-blue-400 hover:underline text-xs"
        >
          View Payment File
        </a>
      </div>
     
    </div>

    <!-- Status -->
    <div
      :class="[
        'text-xs font-medium px-3 py-1 rounded-full',
        participant.participant_payment.status === 1 ? 'bg-green-600 text-white' : 'bg-yellow-500 text-black'
      ]"
    >
      {{ statusText }}
    </div>
  </div>
      </div>
        <!-- <form class="mt-10">
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
        </form> -->
      </div>
    </div>
    <div v-else class="p-8 text-center text-muted-foreground">
      No message selected
    </div>
  </div>
</template>
