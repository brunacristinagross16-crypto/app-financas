"use client"

import { useState } from "react"
import { DashboardView } from "./components/DashboardView"
import { TransactionsView } from "./components/TransactionsView"
import { GoalsView } from "./components/GoalsView"
import { ReportsView } from "./components/ReportsView"
import { EducationView } from "./components/EducationView"
import { QuizView } from "./components/QuizView"
import { Navbar } from "./components/Navbar"
import { Wallet, TrendingUp, Target, BarChart3, BookOpen, ClipboardList } from "lucide-react"

export type ViewType = "quiz" | "dashboard" | "transactions" | "goals" | "reports" | "education"

export default function Home() {
  const [currentView, setCurrentView] = useState<ViewType>("quiz")

  const renderView = () => {
    switch (currentView) {
      case "quiz":
        return <QuizView />
      case "dashboard":
        return <DashboardView />
      case "transactions":
        return <TransactionsView />
      case "goals":
        return <GoalsView />
      case "reports":
        return <ReportsView />
      case "education":
        return <EducationView />
      default:
        return <QuizView />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-6 pb-24 md:pb-6">
        {renderView()}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-50">
        <div className="flex justify-around items-center h-16">
          <button
            onClick={() => setCurrentView("quiz")}
            className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
              currentView === "quiz" ? "text-emerald-600" : "text-gray-500"
            }`}
          >
            <ClipboardList className="w-5 h-5" />
            <span className="text-xs mt-1">Quiz</span>
          </button>
          
          <button
            onClick={() => setCurrentView("dashboard")}
            className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
              currentView === "dashboard" ? "text-emerald-600" : "text-gray-500"
            }`}
          >
            <Wallet className="w-5 h-5" />
            <span className="text-xs mt-1">Início</span>
          </button>
          
          <button
            onClick={() => setCurrentView("transactions")}
            className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
              currentView === "transactions" ? "text-emerald-600" : "text-gray-500"
            }`}
          >
            <TrendingUp className="w-5 h-5" />
            <span className="text-xs mt-1">Transações</span>
          </button>
          
          <button
            onClick={() => setCurrentView("goals")}
            className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
              currentView === "goals" ? "text-emerald-600" : "text-gray-500"
            }`}
          >
            <Target className="w-5 h-5" />
            <span className="text-xs mt-1">Metas</span>
          </button>
          
          <button
            onClick={() => setCurrentView("reports")}
            className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
              currentView === "reports" ? "text-emerald-600" : "text-gray-500"
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            <span className="text-xs mt-1">Relatórios</span>
          </button>
          
          <button
            onClick={() => setCurrentView("education")}
            className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
              currentView === "education" ? "text-emerald-600" : "text-gray-500"
            }`}
          >
            <BookOpen className="w-5 h-5" />
            <span className="text-xs mt-1">Aprender</span>
          </button>
        </div>
      </nav>

      {/* Desktop Side Navigation */}
      <nav className="hidden md:block fixed left-0 top-20 bottom-0 w-64 bg-white border-r border-gray-200 p-4">
        <div className="space-y-2">
          <button
            onClick={() => setCurrentView("quiz")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              currentView === "quiz"
                ? "bg-emerald-100 text-emerald-700 font-medium"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <ClipboardList className="w-5 h-5" />
            <span>Quiz Financeiro</span>
          </button>
          
          <button
            onClick={() => setCurrentView("dashboard")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              currentView === "dashboard"
                ? "bg-emerald-100 text-emerald-700 font-medium"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Wallet className="w-5 h-5" />
            <span>Dashboard</span>
          </button>
          
          <button
            onClick={() => setCurrentView("transactions")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              currentView === "transactions"
                ? "bg-emerald-100 text-emerald-700 font-medium"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <TrendingUp className="w-5 h-5" />
            <span>Transações</span>
          </button>
          
          <button
            onClick={() => setCurrentView("goals")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              currentView === "goals"
                ? "bg-emerald-100 text-emerald-700 font-medium"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Target className="w-5 h-5" />
            <span>Metas de Economia</span>
          </button>
          
          <button
            onClick={() => setCurrentView("reports")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              currentView === "reports"
                ? "bg-emerald-100 text-emerald-700 font-medium"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            <span>Relatórios</span>
          </button>
          
          <button
            onClick={() => setCurrentView("education")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              currentView === "education"
                ? "bg-emerald-100 text-emerald-700 font-medium"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <BookOpen className="w-5 h-5" />
            <span>Educação Financeira</span>
          </button>
        </div>
      </nav>
    </div>
  )
}
