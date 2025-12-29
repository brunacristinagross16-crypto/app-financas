"use client"

import { Card } from "@/components/ui/card"
import { BarChart3, TrendingUp, TrendingDown, PieChart, Calendar } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

export function ReportsView() {
  const [period, setPeriod] = useState("month")

  const categoryData = [
    { category: "Alimentação", amount: 1250.00, percentage: 40, color: "bg-red-500" },
    { category: "Transporte", amount: 650.00, percentage: 21, color: "bg-orange-500" },
    { category: "Lazer", amount: 480.00, percentage: 16, color: "bg-purple-500" },
    { category: "Contas", amount: 420.00, percentage: 14, color: "bg-blue-500" },
    { category: "Saúde", amount: 280.00, percentage: 9, color: "bg-green-500" },
  ]

  const monthlyData = [
    { month: "Jan", income: 8500, expenses: 3080 },
    { month: "Fev", income: 8500, expenses: 3250 },
    { month: "Mar", income: 9200, expenses: 2980 },
    { month: "Abr", income: 8500, expenses: 3420 },
    { month: "Mai", income: 8500, expenses: 3150 },
    { month: "Jun", income: 10200, expenses: 3680 },
  ]

  const insights = [
    {
      title: "Gastos com Alimentação",
      description: "Seus gastos com alimentação aumentaram 15% este mês",
      type: "warning",
      icon: TrendingUp,
      color: "text-orange-600"
    },
    {
      title: "Economia Positiva",
      description: "Você economizou R$ 5.420 este mês, 12% acima da meta",
      type: "success",
      icon: TrendingDown,
      color: "text-green-600"
    },
    {
      title: "Recomendação",
      description: "Considere reduzir gastos com lazer para atingir suas metas mais rápido",
      type: "info",
      icon: BarChart3,
      color: "text-blue-600"
    }
  ]

  return (
    <div className="space-y-6 md:ml-64">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Relatórios</h2>
          <p className="text-gray-500 mt-1">Análise detalhada das suas finanças</p>
        </div>
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Esta Semana</SelectItem>
            <SelectItem value="month">Este Mês</SelectItem>
            <SelectItem value="quarter">Este Trimestre</SelectItem>
            <SelectItem value="year">Este Ano</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6 bg-gradient-to-br from-green-500 to-emerald-600 text-white border-0">
          <div className="flex items-center justify-between mb-2">
            <p className="text-emerald-100 text-sm">Total Receitas</p>
            <TrendingUp className="w-5 h-5" />
          </div>
          <p className="text-3xl font-bold">R$ 8.500</p>
          <p className="text-xs text-emerald-100 mt-2">+12% vs mês anterior</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-red-500 to-pink-600 text-white border-0">
          <div className="flex items-center justify-between mb-2">
            <p className="text-red-100 text-sm">Total Despesas</p>
            <TrendingDown className="w-5 h-5" />
          </div>
          <p className="text-3xl font-bold">R$ 3.080</p>
          <p className="text-xs text-red-100 mt-2">+5% vs mês anterior</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-blue-500 to-cyan-600 text-white border-0">
          <div className="flex items-center justify-between mb-2">
            <p className="text-blue-100 text-sm">Saldo Líquido</p>
            <BarChart3 className="w-5 h-5" />
          </div>
          <p className="text-3xl font-bold">R$ 5.420</p>
          <p className="text-xs text-blue-100 mt-2">64% da receita</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-500 to-pink-600 text-white border-0">
          <div className="flex items-center justify-between mb-2">
            <p className="text-purple-100 text-sm">Média Diária</p>
            <Calendar className="w-5 h-5" />
          </div>
          <p className="text-3xl font-bold">R$ 102</p>
          <p className="text-xs text-purple-100 mt-2">Gastos por dia</p>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Breakdown */}
        <Card className="p-6 bg-white border border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-100 rounded-lg">
              <PieChart className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Despesas por Categoria</h3>
              <p className="text-sm text-gray-500">Distribuição dos gastos</p>
            </div>
          </div>

          <div className="space-y-4">
            {categoryData.map((item) => (
              <div key={item.category} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-700">{item.category}</span>
                  <span className="text-gray-900 font-semibold">R$ {item.amount.toFixed(2)}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-gray-200 rounded-full h-2.5">
                    <div
                      className={`${item.color} h-2.5 rounded-full transition-all duration-500`}
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-600 w-12 text-right">
                    {item.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Monthly Trend */}
        <Card className="p-6 bg-white border border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BarChart3 className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Tendência Mensal</h3>
              <p className="text-sm text-gray-500">Receitas vs Despesas</p>
            </div>
          </div>

          <div className="space-y-6">
            {monthlyData.map((data) => (
              <div key={data.month} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-700 w-12">{data.month}</span>
                  <div className="flex-1 mx-4 flex gap-2">
                    <div className="flex-1 bg-gray-100 rounded-full h-8 flex items-center overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-green-400 to-emerald-500 h-full flex items-center justify-end pr-2"
                        style={{ width: `${(data.income / 12000) * 100}%` }}
                      >
                        <span className="text-xs text-white font-medium">
                          {data.income > 3000 && `R$ ${(data.income / 1000).toFixed(1)}k`}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1 bg-gray-100 rounded-full h-8 flex items-center overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-red-400 to-pink-500 h-full flex items-center justify-end pr-2"
                        style={{ width: `${(data.expenses / 12000) * 100}%` }}
                      >
                        <span className="text-xs text-white font-medium">
                          {data.expenses > 2000 && `R$ ${(data.expenses / 1000).toFixed(1)}k`}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex items-center justify-center gap-6 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-400 to-emerald-500"></div>
                <span className="text-sm text-gray-600">Receitas</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-red-400 to-pink-500"></div>
                <span className="text-sm text-gray-600">Despesas</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Insights */}
      <Card className="p-6 bg-white border border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-emerald-100 rounded-lg">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Insights e Recomendações</h3>
            <p className="text-sm text-gray-500">Análise inteligente das suas finanças</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {insights.map((insight, index) => (
            <div key={index} className="p-4 rounded-lg border border-gray-200 hover:border-emerald-300 transition-colors">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${
                  insight.type === "success" ? "bg-green-100" :
                  insight.type === "warning" ? "bg-orange-100" :
                  "bg-blue-100"
                }`}>
                  <insight.icon className={`w-5 h-5 ${insight.color}`} />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">{insight.title}</h4>
                  <p className="text-sm text-gray-600">{insight.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
