"use client"

import { useState } from "react"
import { Plus, Search, Filter, TrendingUp, TrendingDown, Calendar } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Transaction {
  id: number
  title: string
  amount: number
  type: "income" | "expense"
  category: string
  date: string
  description?: string
}

export function TransactionsView() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 1, title: "Salário", amount: 8500.00, type: "income", category: "Receita", date: "2024-01-01", description: "Salário mensal" },
    { id: 2, title: "Supermercado", amount: -450.00, type: "expense", category: "Alimentação", date: "2024-01-02" },
    { id: 3, title: "Conta de Luz", amount: -180.00, type: "expense", category: "Contas", date: "2024-01-03" },
    { id: 4, title: "Uber", amount: -35.50, type: "expense", category: "Transporte", date: "2024-01-03" },
    { id: 5, title: "Netflix", amount: -49.90, type: "expense", category: "Lazer", date: "2024-01-04" },
    { id: 6, title: "Freelance", amount: 1200.00, type: "income", category: "Receita Extra", date: "2024-01-05" },
    { id: 7, title: "Academia", amount: -120.00, type: "expense", category: "Saúde", date: "2024-01-06" },
    { id: 8, title: "Restaurante", amount: -85.00, type: "expense", category: "Alimentação", date: "2024-01-07" },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<"all" | "income" | "expense">("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const [newTransaction, setNewTransaction] = useState({
    title: "",
    amount: "",
    type: "expense" as "income" | "expense",
    category: "",
    date: new Date().toISOString().split('T')[0],
    description: ""
  })

  const categories = {
    income: ["Receita", "Receita Extra", "Investimentos", "Outros"],
    expense: ["Alimentação", "Transporte", "Contas", "Lazer", "Saúde", "Educação", "Outros"]
  }

  const filteredTransactions = transactions.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         t.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === "all" || t.type === filterType
    return matchesSearch && matchesFilter
  })

  const handleAddTransaction = () => {
    if (!newTransaction.title || !newTransaction.amount || !newTransaction.category) {
      return
    }

    const transaction: Transaction = {
      id: Date.now(),
      title: newTransaction.title,
      amount: newTransaction.type === "expense" ? -Math.abs(parseFloat(newTransaction.amount)) : Math.abs(parseFloat(newTransaction.amount)),
      type: newTransaction.type,
      category: newTransaction.category,
      date: newTransaction.date,
      description: newTransaction.description
    }

    setTransactions([transaction, ...transactions])
    setIsAddDialogOpen(false)
    setNewTransaction({
      title: "",
      amount: "",
      type: "expense",
      category: "",
      date: new Date().toISOString().split('T')[0],
      description: ""
    })
  }

  return (
    <div className="space-y-6 md:ml-64">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Transações</h2>
          <p className="text-gray-500 mt-1">Gerencie suas receitas e despesas</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg">
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Transação
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Nova Transação</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="type">Tipo</Label>
                <Select value={newTransaction.type} onValueChange={(value: "income" | "expense") => setNewTransaction({...newTransaction, type: value, category: ""})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="income">Receita</SelectItem>
                    <SelectItem value="expense">Despesa</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  placeholder="Ex: Salário, Supermercado..."
                  value={newTransaction.title}
                  onChange={(e) => setNewTransaction({...newTransaction, title: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Valor (R$)</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={newTransaction.amount}
                  onChange={(e) => setNewTransaction({...newTransaction, amount: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Categoria</Label>
                <Select value={newTransaction.category} onValueChange={(value) => setNewTransaction({...newTransaction, category: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories[newTransaction.type].map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Data</Label>
                <Input
                  id="date"
                  type="date"
                  value={newTransaction.date}
                  onChange={(e) => setNewTransaction({...newTransaction, date: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição (opcional)</Label>
                <Input
                  id="description"
                  placeholder="Adicione uma descrição..."
                  value={newTransaction.description}
                  onChange={(e) => setNewTransaction({...newTransaction, description: e.target.value})}
                />
              </div>

              <Button onClick={handleAddTransaction} className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700">
                Adicionar Transação
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card className="p-4 bg-white border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Buscar transações..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={filterType === "all" ? "default" : "outline"}
              onClick={() => setFilterType("all")}
              className={filterType === "all" ? "bg-emerald-600 hover:bg-emerald-700" : ""}
            >
              Todas
            </Button>
            <Button
              variant={filterType === "income" ? "default" : "outline"}
              onClick={() => setFilterType("income")}
              className={filterType === "income" ? "bg-green-600 hover:bg-green-700" : ""}
            >
              Receitas
            </Button>
            <Button
              variant={filterType === "expense" ? "default" : "outline"}
              onClick={() => setFilterType("expense")}
              className={filterType === "expense" ? "bg-red-600 hover:bg-red-700" : ""}
            >
              Despesas
            </Button>
          </div>
        </div>
      </Card>

      {/* Transactions List */}
      <Card className="p-6 bg-white border border-gray-200 shadow-lg">
        <div className="space-y-4">
          {filteredTransactions.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Nenhuma transação encontrada</p>
            </div>
          ) : (
            filteredTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100">
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
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-gray-500">{transaction.category}</span>
                      <span className="text-gray-300">•</span>
                      <span className="text-sm text-gray-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(transaction.date).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    {transaction.description && (
                      <p className="text-xs text-gray-400 mt-1">{transaction.description}</p>
                    )}
                  </div>
                </div>
                <p className={`text-lg font-semibold ${
                  transaction.type === "income" ? "text-green-600" : "text-red-600"
                }`}>
                  {transaction.type === "income" ? "+" : ""}R$ {Math.abs(transaction.amount).toFixed(2)}
                </p>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  )
}
