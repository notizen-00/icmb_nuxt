<script setup lang="ts">
import type { Table } from '@tanstack/vue-table'
import type { Task } from '../data/schema'
import { computed } from 'vue'
import { priorities, statuses } from '../data/data'
import DataTableFacetedFilter from './DataTableFacetedFilter.vue'
import DataTableViewOptions from './DataTableViewOptions.vue'

interface DataTableToolbarProps {
  table: Table<Task>
}

const props = defineProps<DataTableToolbarProps>()

const isFiltered = computed(() => props.table.getState().columnFilters.length > 0)
</script>

<template>
  <div class="flex items-center justify-between">
    <div class="flex flex-1 items-center space-x-2">
      <Input
        placeholder="Filter tasks..."
        :model-value="(table.getColumn('order_id')?.getFilterValue() as string) ?? ''"
        class="h-8 w-[150px] lg:w-[250px]"
        @input="table.getColumn('order_id')?.setFilterValue($event.target.value)"
      />
      <DataTableFacetedFilter
        v-if="table.getColumn('transaction_status')"
        :column="table.getColumn('transaction_status')"
        title="Status"
        :options="statuses"
      />
     

      <Button
        v-if="isFiltered"
        variant="ghost"
        class="h-8 px-2 lg:px-3"
        @click="table.resetColumnFilters()"
      >
        Reset
        <Icon name="i-radix-icons-cross-2" class="ml-2 h-4 w-4" />
      </Button>
    </div>
    <DataTableViewOptions :table="table" />
  </div>
</template>
