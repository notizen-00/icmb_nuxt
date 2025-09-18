<template>
  <div class="flex items-center p-2">
    <!-- Left Buttons -->
    <div class="flex items-center gap-2">
      <!-- Back Button -->
      <Tooltip>
        <TooltipTrigger as-child>
          <Button variant="ghost" size="icon"  @click="router.back()">
            <ArrowLeft class="size-4" />
            <span class="sr-only">Back</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>Back</TooltipContent>
      </Tooltip>

      <!-- ArchiveX -->
      <span class="">{{ submission.participant.manuscript_title }}</span>

      <Separator orientation="vertical" class="mx-1 h-6" />

    </div>

    <!-- Right Buttons -->
    <div class="ml-auto flex items-center gap-2">
      
      <Tooltip>
        <TooltipTrigger as-child>
          <Button @click="useSubmissionStore().fetchSubmissionDetail(route.params.id)" variant="ghost" size="icon" >
            <i class="fal fa-refresh"></i>
            <span class="sr-only">Reply</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>Refresh</TooltipContent>
      </Tooltip>
    
     
    </div>
     <BaseBadgeStatus :status="submission.status"></BaseBadgeStatus>

    <Separator orientation="vertical" class="mx-2 h-6" />

    <!-- Dropdown Menu -->
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button variant="ghost" size="icon" >
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
</template>

<script setup>
import { useRouter } from 'vue-router'
import { defineProps } from 'vue';
import { addDays, addHours, format, nextSaturday } from 'date-fns'
import {
  ArchiveX,
  ArrowLeft,
  Clock,
  Forward,
  MoreVertical,
  Reply,
  ReplyAll,
  Trash2
} from 'lucide-vue-next'

const props = defineProps({
  submission: Object,
})

console.log(props);
const route = useRoute()




const router = useRouter()
const today = new Date()
</script>
