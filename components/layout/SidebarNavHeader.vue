<script setup lang="ts">
import { useSidebar } from '~/components/ui/sidebar'

const participantStore = useParticipantStore()

const isLoading = ref(true)

onMounted(async () => {
  isLoading.value = true
  try {
    await participantStore.fetchDetail()
  } catch (e) {
    console.error('Failed to fetch participant details:', e)
  } finally {
    isLoading.value = false
  }
})


const props = defineProps<{
  teams: {
    name: string
    logo: string
    plan: string
  }[]
}>()



const { isMobile } = useSidebar()

const activeTeam = ref(props.teams[0])
</script>

<template>
  <SidebarMenu>
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <SidebarMenuButton
            size="lg"
            class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <div class="aspect-square size-8 flex items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <Icon :name="activeTeam.logo" class="size-4" />
            </div>
            
            <NuxtLoadingIndicator v-if="isLoading"></NuxtLoadingIndicator>
            <div v-else class="grid flex-1 text-left text-sm leading-tight">
            <span class="truncate font-semibold">
              {{ participantStore.detailParticipant?.team?.[0]?.name || 'No Conference' }}
            </span>
            <span
              class="inline-flex items-center gap-1 rounded bg-blue-500/10 text-blue-600 text-[11px] font-medium px-1.5 py-0.5"
            >
              <Icon name="i-lucide-award" class="size-3 text-blue-600" />
              {{ participantStore.detailParticipant?.participant?.[0]?.conference_type?.name || 'No Conference Type' }}
            </span>


            </div>
            <Icon name="i-lucide-chevrons-up-down" class="ml-auto" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <!-- <DropdownMenuContent
          class="min-w-56 w-[--radix-dropdown-menu-trigger-width] rounded-lg"
          align="start"
          :side="isMobile ? 'bottom' : 'right'"
        >
          <DropdownMenuLabel class="text-xs text-muted-foreground">
            Teams
          </DropdownMenuLabel>
          <DropdownMenuItem
            v-for="(team, index) in teams"
            :key="team.name"
            class="gap-2 p-2"
            @click="activeTeam = team"
          >
            <div class="size-6 flex items-center justify-center border rounded-sm">
              <Icon :name="team.logo" class="size-4 shrink-0" />
            </div>
            {{ team.name }}
            <DropdownMenuShortcut>⌘{{ index + 1 }}</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem class="gap-2 p-2">
            <div class="size-6 flex items-center justify-center border rounded-md bg-background">
              <Icon name="i-lucide-plus" class="size-4" />
            </div>
            <div class="text-muted-foreground font-medium">
              Add team
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent> -->
      </DropdownMenu>
    </SidebarMenuItem>
  </SidebarMenu>
</template>

<style scoped>

</style>
