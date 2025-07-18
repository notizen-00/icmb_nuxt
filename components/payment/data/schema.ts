import { z } from 'zod'


export const taskSchema = z.object({
status_code: z.string(),
  transaction_id: z.string(),
  gross_amount: z.string(),
  currency: z.string(),
  order_id: z.string(),
  payment_type: z.string(),
  signature_key: z.string(),
  transaction_status: z.string(),
  fraud_status: z.string(),
  status_message: z.string(),
  merchant_id: z.string(),
  va_numbers: z.array(z.object({
    bank: z.string(),
    va_number: z.string(),
  })),
  payment_amounts: z.array(z.object({
    amount: z.string(),
    paid_at: z.string(),
  })),
  transaction_time: z.string(),
  expiry_time: z.string(),
})

export type Task = z.infer<typeof taskSchema>
