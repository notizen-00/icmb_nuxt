import type { ColumnDef } from '@tanstack/vue-table'

import type { Task } from '../data/schema'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { h } from 'vue'
import { labels, priorities, statuses } from '../data/data'
import DataTableColumnHeader from './DataTableColumnHeader.vue'
import DataTableRowActions from './DataTableRowActions.vue'

export const columns: ColumnDef<Task>[] = [
  {
    id: 'select',
    header: ({ table }) =>
      h(Checkbox, {
        checked: table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate'),
        'onUpdate:checked': value => table.toggleAllPageRowsSelected(!!value),
        ariaLabel: 'Select all',
        class: 'translate-y-0.5',
      }),
    cell: ({ row }) =>
      h(Checkbox, {
        checked: row.getIsSelected(),
        'onUpdate:checked': value => row.toggleSelected(!!value),
        ariaLabel: 'Select row',
        class: 'translate-y-0.5',
      }),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'order_id',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Transaction Code' }),
    cell: ({ row }) =>
      h('div', { class: 'font-medium' }, row.getValue('order_id')),
  },
  {
    accessorKey: 'transaction_status',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Status' }),
    cell: ({ row }) => {
      const status = statuses.find(
             status => status.value === row.getValue('transaction_status'),
           )
     
           if (!status)
             return null
     
           return h('div', { class: 'flex w-[100px] items-center ' }, [
             status.icon && h(status.icon, { class: `mr-2 h-4 w-4 text-muted-foreground text-2xl text-blue-400 `}),
             h('span',{class:'text-blue-400'}, status.label),
           ])
    },
  },
{
  accessorKey: 'payment_type',
  header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Payment Method / VA' }),
  cell: ({ row }) => {
    const typed = row.getValue('payment_type')
    const vaNumbers = row.original.va_numbers
    const vaInfo = Array.isArray(vaNumbers) && vaNumbers.length > 0
      ? `${vaNumbers[0].bank.toUpperCase()} - ${vaNumbers[0].va_number}`
      : null

    return h('div', { class: 'flex flex-col gap-1' }, [
      h('span', { class: 'capitalize font-medium' }, row.getValue('payment_type')),
      vaInfo ? h('span', { class: 'text-xs text-muted-foreground' }, vaInfo) : null,
    ])
  },
}
,
  {
    accessorKey: 'gross_amount',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Amount (IDR)' }),
    cell: ({ row }) => {
      const raw = row.getValue('gross_amount')
      return h('span', {}, `Rp ${Number(raw).toLocaleString('id-ID')}`)
    },
  },
  {
    accessorKey: 'transaction_time',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Transaction Time' }),
    cell: ({ row }) => {
      const time = new Date(row.getValue('transaction_time'))
      return h('span', {}, time.toLocaleString('id-ID'))
    },
  },
    {
    accessorKey: 'settlement_time',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Settlement Time' }),
    cell: ({ row }) => {
      const time = new Date(row.getValue('settlement_time'))
      return h('span', {}, time.toLocaleString('id-ID'))
    },
  },
    {
    accessorKey: 'expiry_time',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Expired Time' }),
    cell: ({ row }) => {
      const time = new Date(row.getValue('expiry_time'))
      return h('span', {}, time.toLocaleString('id-ID'))
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => h(DataTableRowActions, { row }),
  },
]
