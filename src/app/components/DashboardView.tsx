"use client"

import { useState, useEffect } from "react"
import { TrendingUp, TrendingDown, Wallet, PiggyBank, Plus, Bell, Calendar } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { NotificationManager } from "@/lib/notifications"
import { supabase } from "@/lib/supabase"
import type { Transaction, Goal, Bill } from "@/lib/supabase"

interface DashboardViewProps {
  notificationsEnabled?: boolean
}

export function DashboardView({ notificationsEnabled = false }: DashboardViewProps) {
  const [balance, setBalance] = useState(0)
  const [income, setIncome] = useState(0)
  const [expenses, setExpenses] = useState(0)
  const [upcomingBills, setUpcomingBills] = useState<Bill[]>([])
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([])
  const [goals, setGoals] = useState<Goal[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
    
    // Registrar service worker quando o componente montar
    if (notificationsEnabled) {
      NotificationManager.registerServiceWorker()
    }
  }, [notificationsEnabled])

  const loadDashboardData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      // Carregar transações
      const { data: transactions } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false })
        .limit(5)

      if (transactions) {
        setRecentTransactions(transactions)
        
        // Calcular totais
        const totalIncome = transactions
          .filter(t => t.type === 'income')
          .reduce((sum, t) => sum + Number(t.amount), 0)
        
        const totalExpenses = transactions
          .filter(t => t.type === 'expense')
          .reduce((sum, t) => sum + Number(t.amount), 0)
        
        setIncome(totalIncome)
        setExpenses(totalExpenses)
        setBalance(totalIncome - totalExpenses)
      }

      // Carregar contas a pagar
      const { data: bills } = await supabase
        .from('bills')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_paid', false)
        .order('due_date', { ascending: true })
        .limit(5)

      if (bills) {
        setUpcomingBills(bills)
      }

      // Carregar metas
      const { data: goalsData } = await supabase
        .from('goals')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)

      if (goalsData && goalsData.length > 0) {
        setGoals(goalsData)
      }

    } catch (error) {
      console.error('Erro ao carregar dados:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleScheduleReminder = (bill: Bill) => {
    if (notificationsEnabled) {
      NotificationManager.scheduleBillReminder(bill.name, new Date(bill.due_date), Number(bill.amount))
      NotificationManager.showNotification("Lembrete Agendado! ✅", {
        body: `Você será notificado sobre: ${bill.name}`,
        tag: `reminder-scheduled-${bill.id}`,
      })
    }
  }

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date()
    const due = new Date(dueDate)
    const diffTime = due.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Carregando dados...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 md:ml-64">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Dashboard</h2>
          <p className="text-gray-500 mt-1">Visão geral das suas finanças</p>
        </div>
        <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg">
          <Plus className="w-4 h-4 mr-2" />
          Nova Transação
        </Button>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="p-6 bg-gradient-to-br from-emerald-500 to-teal-600 text-white border-0 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
              <Wallet className="w-6 h-6" />
            </div>
          </div>
          <p className="text-emerald-100 text-sm mb-1">Saldo Total</p>
          <p className="text-3xl font-bold">R$ {balance.toFixed(2)}</p>
        </Card>

        <Card className="p-6 bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-gray-500 text-sm mb-1">Receitas</p>
          <p className="text-2xl font-bold text-gray-900">R$ {income.toFixed(2)}</p>
        </Card>

        <Card className="p-6 bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-red-100 rounded-lg">
              <TrendingDown className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <p className="text-gray-500 text-sm mb-1">Despesas</p>
          <p className="text-2xl font-bold text-gray-900">R$ {expenses.toFixed(2)}</p>
        </Card>
      </div>

      {/* Upcoming Bills with Notifications */}
      <Card className="p-6 bg-white border border-gray-200 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Contas a Pagar</h3>
              <p className="text-sm text-gray-500">Próximos vencimentos</p>
            </div>
          </div>
        </div>
        <div className="space-y-3">
          {upcomingBills.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Nenhuma conta a pagar cadastrada</p>
          ) : (
            upcomingBills.map((bill) => {
              const daysUntil = getDaysUntilDue(bill.due_date)
              const isUrgent = daysUntil <= 3
              
              return (
                <div 
                  key={bill.id} 
                  className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all ${
                    isUrgent 
                      ? "border-red-200 bg-red-50" 
                      : "border-gray-200 bg-gray-50"
                  }`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-gray-900">{bill.name}</p>
                      {isUrgent && (
                        <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full">
                          URGENTE
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">
                      Vence em {daysUntil} {daysUntil === 1 ? "dia" : "dias"} • {bill.category}
                    </p>
                    <p className="text-lg font-bold text-gray-900 mt-1">
                      R$ {Number(bill.amount).toFixed(2)}
                    </p>
                  </div>
                  {notificationsEnabled && (
                    <Button
                      onClick={() => handleScheduleReminder(bill)}
                      variant="outline"
                      size="sm"
                      className="ml-4 border-emerald-500 text-emerald-600 hover:bg-emerald-50"
                    >
                      <Bell className="w-4 h-4 mr-2" />
                      Lembrar
                    </Button>
                  )}
                </div>
              )
            })
          )}
        </div>
      </Card>

      {/* Savings Goal Preview */}
      {goals.length > 0 && (
        <Card className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 rounded-lg">
                <PiggyBank className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Meta: {goals[0].name}</h3>
                <p className="text-sm text-gray-500">
                  R$ {Number(goals[0].current_amount).toFixed(2)} de R$ {Number(goals[0].target_amount).toFixed(2)}
                </p>
              </div>
            </div>
            <span className="text-2xl font-bold text-purple-600">
              {Math.round((Number(goals[0].current_amount) / Number(goals[0].target_amount)) * 100)}%
            </span>
          </div>
          <div className="w-full bg-purple-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full" 
              style={{ width: `${Math.min((Number(goals[0].current_amount) / Number(goals[0].target_amount)) * 100, 100)}%` }}
            ></div>
          </div>
        </Card>
      )}

      {/* Recent Transactions */}
      <Card className="p-6 bg-white border border-gray-200 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Transações Recentes</h3>
        </div>
        <div className="space-y-4">
          {recentTransactions.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Nenhuma transação cadastrada</p>
          ) : (
            recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${
                    transaction.type === "income" ? "bg-green-100" : "bg-red-100"
                  }`}>
                    {transaction.type === "income" ? (
                      <TrendingUp className="w-5 h-5 text-green-600" />
                    ) : (
                      <TrendingDown className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{transaction.title}</p>
                    <p className="text-sm text-gray-500">{transaction.category} • {new Date(transaction.date).toLocaleDateString('pt-BR')}</p>
                  </div>
                </div>
                <p className={`text-lg font-semibold ${
                  transaction.type === "income" ? "text-green-600" : "text-red-600"
                }`}>
                  {transaction.type === "income" ? "+" : "-"}R$ {Math.abs(Number(transaction.amount)).toFixed(2)}
                </p>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  )
}
