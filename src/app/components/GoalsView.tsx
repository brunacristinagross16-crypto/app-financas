"use client"

import { useState } from "react"
import { Plus, Target, TrendingUp, Calendar, DollarSign } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"

interface Goal {
  id: number
  title: string
  targetAmount: number
  currentAmount: number
  deadline: string
  category: string
}

export function GoalsView() {
  const [goals, setGoals] = useState<Goal[]>([
    { id: 1, title: "Viagem de Férias", targetAmount: 5000, currentAmount: 3500, deadline: "2024-12-31", category: "Lazer" },
    { id: 2, title: "Fundo de Emergência", targetAmount: 10000, currentAmount: 4200, deadline: "2024-06-30", category: "Segurança" },
    { id: 3, title: "Novo Notebook", targetAmount: 4500, currentAmount: 2800, deadline: "2024-08-15", category: "Tecnologia" },
  ])

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isDepositDialogOpen, setIsDepositDialogOpen] = useState(false)
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null)
  const [depositAmount, setDepositAmount] = useState("")

  const [newGoal, setNewGoal] = useState({
    title: "",
    targetAmount: "",
    currentAmount: "0",
    deadline: "",
    category: ""
  })

  const handleAddGoal = () => {
    if (!newGoal.title || !newGoal.targetAmount || !newGoal.deadline || !newGoal.category) {
      return
    }

    const goal: Goal = {
      id: Date.now(),
      title: newGoal.title,
      targetAmount: parseFloat(newGoal.targetAmount),
      currentAmount: parseFloat(newGoal.currentAmount),
      deadline: newGoal.deadline,
      category: newGoal.category
    }

    setGoals([...goals, goal])
    setIsAddDialogOpen(false)
    setNewGoal({
      title: "",
      targetAmount: "",
      currentAmount: "0",
      deadline: "",
      category: ""
    })
  }

  const handleDeposit = () => {
    if (!selectedGoal || !depositAmount) return

    const amount = parseFloat(depositAmount)
    const updatedGoals = goals.map(g => 
      g.id === selectedGoal.id 
        ? { ...g, currentAmount: Math.min(g.currentAmount + amount, g.targetAmount) }
        : g
    )

    setGoals(updatedGoals)
    setIsDepositDialogOpen(false)
    setDepositAmount("")
    setSelectedGoal(null)
  }

  const getProgress = (goal: Goal) => {
    return Math.min((goal.currentAmount / goal.targetAmount) * 100, 100)
  }

  const getDaysRemaining = (deadline: string) => {
    const today = new Date()
    const deadlineDate = new Date(deadline)
    const diffTime = deadlineDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <div className="space-y-6 md:ml-64">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Metas de Economia</h2>
          <p className="text-gray-500 mt-1">Defina e acompanhe seus objetivos financeiros</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg">
              <Plus className="w-4 h-4 mr-2" />
              Nova Meta
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Criar Nova Meta</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="goal-title">Título da Meta</Label>
                <Input
                  id="goal-title"
                  placeholder="Ex: Viagem, Carro, Casa..."
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="goal-category">Categoria</Label>
                <Input
                  id="goal-category"
                  placeholder="Ex: Lazer, Investimento, Educação..."
                  value={newGoal.category}
                  onChange={(e) => setNewGoal({...newGoal, category: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="goal-target">Valor Alvo (R$)</Label>
                <Input
                  id="goal-target"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={newGoal.targetAmount}
                  onChange={(e) => setNewGoal({...newGoal, targetAmount: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="goal-current">Valor Inicial (R$)</Label>
                <Input
                  id="goal-current"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={newGoal.currentAmount}
                  onChange={(e) => setNewGoal({...newGoal, currentAmount: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="goal-deadline">Data Limite</Label>
                <Input
                  id="goal-deadline"
                  type="date"
                  value={newGoal.deadline}
                  onChange={(e) => setNewGoal({...newGoal, deadline: e.target.value})}
                />
              </div>

              <Button onClick={handleAddGoal} className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700">
                Criar Meta
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-6 bg-white border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Target className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-sm text-gray-500">Metas Ativas</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">{goals.length}</p>
        </Card>

        <Card className="p-6 bg-white border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-sm text-gray-500">Total Economizado</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            R$ {goals.reduce((sum, g) => sum + g.currentAmount, 0).toFixed(2)}
          </p>
        </Card>

        <Card className="p-6 bg-white border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-sm text-gray-500">Meta Total</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            R$ {goals.reduce((sum, g) => sum + g.targetAmount, 0).toFixed(2)}
          </p>
        </Card>
      </div>

      {/* Goals List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {goals.map((goal) => {
          const progress = getProgress(goal)
          const daysRemaining = getDaysRemaining(goal.deadline)
          const isCompleted = progress >= 100

          return (
            <Card key={goal.id} className={`p-6 border-2 transition-all hover:shadow-lg ${
              isCompleted ? "border-green-300 bg-green-50" : "border-gray-200 bg-white"
            }`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl font-bold text-gray-900">{goal.title}</h3>
                    {isCompleted && (
                      <span className="px-2 py-1 bg-green-500 text-white text-xs rounded-full">
                        Concluída!
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{goal.category}</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Target className="w-6 h-6 text-purple-600" />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Progresso</span>
                    <span className="text-sm font-semibold text-gray-900">{progress.toFixed(0)}%</span>
                  </div>
                  <Progress value={progress} className="h-3" />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div>
                    <p className="text-gray-500">Economizado</p>
                    <p className="text-lg font-bold text-gray-900">R$ {goal.currentAmount.toFixed(2)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-500">Meta</p>
                    <p className="text-lg font-bold text-gray-900">R$ {goal.targetAmount.toFixed(2)}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {daysRemaining > 0 
                        ? `${daysRemaining} dias restantes` 
                        : daysRemaining === 0 
                        ? "Último dia!" 
                        : "Prazo expirado"}
                    </span>
                  </div>
                  {!isCompleted && (
                    <Button
                      size="sm"
                      onClick={() => {
                        setSelectedGoal(goal)
                        setIsDepositDialogOpen(true)
                      }}
                      className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Depositar
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Deposit Dialog */}
      <Dialog open={isDepositDialogOpen} onOpenChange={setIsDepositDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Depositar na Meta</DialogTitle>
          </DialogHeader>
          {selectedGoal && (
            <div className="space-y-4 py-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Meta selecionada</p>
                <p className="font-semibold text-gray-900">{selectedGoal.title}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Faltam R$ {(selectedGoal.targetAmount - selectedGoal.currentAmount).toFixed(2)} para completar
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="deposit-amount">Valor do Depósito (R$)</Label>
                <Input
                  id="deposit-amount"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                />
              </div>

              <Button onClick={handleDeposit} className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700">
                Confirmar Depósito
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
