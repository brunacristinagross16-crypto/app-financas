import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Validação das variáveis de ambiente
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Variáveis de ambiente do Supabase não configuradas. Configure em .env.local')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Transaction = {
  id: string
  user_id: string
  title: string
  amount: number
  type: 'income' | 'expense'
  category: string
  date: string
  created_at: string
}

export type Goal = {
  id: string
  user_id: string
  name: string
  target_amount: number
  current_amount: number
  deadline: string
  created_at: string
}

export type Bill = {
  id: string
  user_id: string
  name: string
  amount: number
  due_date: string
  category: string
  is_paid: boolean
  created_at: string
}

export type Budget = {
  id: string
  user_id: string
  category: string
  limit_amount: number
  current_amount: number
  month: string
  created_at: string
}
