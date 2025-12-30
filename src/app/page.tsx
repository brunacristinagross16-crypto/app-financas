"use client"

import { useState, useEffect } from "react"
import { DashboardView } from "./components/DashboardView"
import { TransactionsView } from "./components/TransactionsView"
import { GoalsView } from "./components/GoalsView"
import { ReportsView } from "./components/ReportsView"
import { EducationView } from "./components/EducationView"
import { QuizView } from "./components/QuizView"
import { Navbar } from "./components/Navbar"
import { Wallet, TrendingUp, Target, BarChart3, BookOpen, Bell } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export type ViewType = "dashboard" | "transactions" | "goals" | "reports" | "education"

export default function Home() {
  const router = useRouter()
  const [currentView, setCurrentView] = useState<ViewType>("dashboard")
  const [hasCompletedQuiz, setHasCompletedQuiz] = useState(false)
  const [notificationsEnabled, setNotificationsEnabled] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Verificar autenticação
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        
        if (!session) {
          router.push("/auth")
          return
        }
        
        setIsAuthenticated(true)
        setLoading(false)

        // Verificar se o quiz já foi completado
        const quizCompleted = localStorage.getItem(`quizCompleted_${session.user.id}`)
        if (quizCompleted === "true") {
          setHasCompletedQuiz(true)
        }

        // Verificar status das notificações
        if ("Notification" in window) {
          setNotificationsEnabled(Notification.permission === "granted")
        }
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error)
        router.push("/auth")
      }
    }

    checkAuth()

    // Listener para mudanças de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.push("/auth")
      } else {
        setIsAuthenticated(true)
      }
    })

    return () => subscription.unsubscribe()
  }, [router])

  const handleQuizComplete = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        localStorage.setItem(`quizCompleted_${session.user.id}`, "true")
        setHasCompletedQuiz(true)
        requestNotificationPermission()
      }
    } catch (error) {
      console.error("Erro ao completar quiz:", error)
      setHasCompletedQuiz(true)
    }
  }

  const requestNotificationPermission = async () => {
    if ("Notification" in window && Notification.permission === "default") {
      const permission = await Notification.requestPermission()
      setNotificationsEnabled(permission === "granted")
      
      if (permission === "granted") {
        // Notificação de boas-vindas
        new Notification("Bem-vindo ao Finanças em Dia! 🎉", {
          body: "Você receberá alertas sobre contas a pagar e metas financeiras.",
          icon: "/icon.svg",
        })
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <Wallet className="w-16 h-16 text-emerald-600 animate-pulse mx-auto mb-4" />
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  // Se não completou o quiz, mostrar apenas o quiz
  if (!hasCompletedQuiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
        <QuizView onComplete={handleQuizComplete} />
      </div>
    )
  }

  const renderView = () => {
    switch (currentView) {
      case "dashboard":
        return <DashboardView notificationsEnabled={notificationsEnabled} />
      case "transactions":
        return <TransactionsView />
      case "goals":
        return <GoalsView />
      case "reports":
        return <ReportsView />
      case "education":
        return <EducationView />
      default:
        return <DashboardView notificationsEnabled={notificationsEnabled} />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <Navbar />
      
      {/* Banner de notificações se não estiver habilitado */}
      {!notificationsEnabled && (
        <div className="bg-amber-500 text-white px-4 py-3 text-center">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <Bell className="w-5 h-5" />
            <span className="font-medium">Ative as notificações para receber alertas de contas a pagar!</span>
            <button
              onClick={requestNotificationPermission}
              className="bg-white text-amber-600 px-4 py-1 rounded-lg font-semibold hover:bg-amber-50 transition-colors ml-2"
            >
              Ativar Agora
            </button>
          </div>
        </div>
      )}
      
      <main className="container mx-auto px-4 py-6 pb-24 md:pb-6">
        {renderView()}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-50">
        <div className="flex justify-around items-center h-16">
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
