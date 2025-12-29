"use client"

import { useState } from "react"
import { TrendingUp, TrendingDown, Wallet, PiggyBank, Plus } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function DashboardView() {
  const [balance] = useState(5420.50)
  const [income] = useState(8500.00)
  const [expenses] = useState(3079.50)

  const recentTransactions = [
    { id: 1, title: "Salário", amount: 8500.00, type: "income", category: "Receita", date: "01/01/2024" },
    { id: 2, title: "Supermercado", amount: -450.00, type: "expense", category: "Alimentação", date: "02/01/2024" },
    { id: 3, title: "Conta de Luz", amount: -180.00, type: "expense", category: "Contas", date: "03/01/2024" },
    { id: 4, title: "Uber", amount: -35.50, type: "expense", category: "Transporte", date: "03/01/2024" },
    { id: 5, title: "Netflix", amount: -49.90, type: "expense", category: "Lazer", date: "04/01/2024" },
  ]

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
          <p className="text-xs text-green-600 mt-2">+12% vs mês anterior</p>
        </Card>

        <Card className="p-6 bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-red-100 rounded-lg">
              <TrendingDown className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <p className="text-gray-500 text-sm mb-1">Despesas</p>
          <p className="text-2xl font-bold text-gray-900">R$ {expenses.toFixed(2)}</p>
          <p className="text-xs text-red-600 mt-2">+5% vs mês anterior</p>
        </Card>
      </div>

      {/* Savings Goal Preview */}
      <Card className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 rounded-lg">
              <PiggyBank className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Meta: Viagem de Férias</h3>
              <p className="text-sm text-gray-500">R$ 3.500 de R$ 5.000</p>
            </div>
          </div>
          <span className="text-2xl font-bold text-purple-600">70%</span>
        </div>
        <div className="w-full bg-purple-200 rounded-full h-3">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full" style={{ width: "70%" }}></div>
        </div>
      </Card>

      {/* Recent Transactions */}
      <Card className="p-6 bg-white border border-gray-200 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Transações Recentes</h3>
          <Button variant="ghost" className="text-emerald-600 hover:text-emerald-700">
            Ver todas
          </Button>
        </div>
        <div className="space-y-4">
          {recentTransactions.map((transaction) => (
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
                  <p className="text-sm text-gray-500">{transaction.category} • {transaction.date}</p>
                </div>
              </div>
              <p className={`text-lg font-semibold ${
                transaction.type === "income" ? "text-green-600" : "text-red-600"
              }`}>
                {transaction.type === "income" ? "+" : ""}R$ {Math.abs(transaction.amount).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
