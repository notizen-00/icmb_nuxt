import { Icon } from '#components'
import { h } from 'vue'

export const labels = [
  {
    value: 'bug',
    label: 'Bug',
  },
  {
    value: 'feature',
    label: 'Feature',
  },
  {
    value: 'documentation',
    label: 'Documentation',
  },
]

export const statuses = [
  {
    value: 'pending',
    label: 'Pending',
    color: 'blue',
    icon: h(Icon, { name: 'i-radix-icons-info-circled' }),
  },
  {
    value: 'todo',
    label: 'Todo',
    color: 'blue',
    icon: h(Icon, { name: 'i-radix-icons-circle' }),
  },
  {
    value: 'pendings',
    label: 'Pending',
    color: 'blue',
    icon: h(Icon, { name: 'i-radix-icons-stopwatch' }),
  },
  {
    value: 'settlement',
    label: 'Settlement',
    color: 'green',
    icon: h(Icon, { name: 'i-radix-icons-check-circled' }),
  },
  {
    value: 'canceled',
    label: 'Canceled',
    color: 'red',
    icon: h(Icon, { name: 'i-radix-icons-cross-circled' }),
  },
]

export const priorities = [
  {
    value: 'low',
    label: 'Low',
    icon: h(Icon, { name: 'i-radix-icons-arrow-down' }),
  },
  {
    value: 'medium',
    label: 'Medium',
    icon: h(Icon, { name: 'i-radix-icons-arrow-right' }),
  },
  {
    value: 'high',
    label: 'High',
    icon: h(Icon, { name: 'i-radix-icons-arrow-up' }),
  },
]
