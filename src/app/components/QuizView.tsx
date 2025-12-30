"use client"

import { useState } from "react"
import { CheckCircle2, XCircle, ArrowRight, TrendingUp, Target, PiggyBank, Sparkles } from "lucide-react"

type Question = {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  painPoint: string
  solution: string
}

const questions: Question[] = [
  {
    id: 1,
    question: "Como você se sente em relação às suas finanças atualmente?",
    options: [
      "Totalmente perdido(a), não sei por onde começar",
      "Tenho algum controle, mas poderia ser melhor",
      "Estou satisfeito(a), mas quero melhorar",
      "Tenho controle total das minhas finanças"
    ],
    correctAnswer: 0,
    painPoint: "Muitas pessoas se sentem perdidas com suas finanças",
    solution: "O Finanças em Dia organiza tudo automaticamente para você!"
  },
  {
    id: 2,
    question: "Com que frequência você esquece de pagar contas importantes?",
    options: [
      "Frequentemente, e isso me causa problemas",
      "Às vezes esqueço algumas contas",
      "Raramente esqueço",
      "Nunca esqueço"
    ],
    correctAnswer: 0,
    painPoint: "Esquecer contas pode gerar multas e juros desnecessários",
    solution: "Receba alertas automáticos e nunca mais pague multas!"
  },
  {
    id: 3,
    question: "Você sabe exatamente quanto gastou no último mês?",
    options: [
      "Não faço ideia",
      "Tenho uma noção aproximada",
      "Sei mais ou menos",
      "Sei exatamente"
    ],
    correctAnswer: 0,
    painPoint: "Sem controle dos gastos, é impossível economizar",
    solution: "Visualize todos os seus gastos em gráficos claros e intuitivos!"
  },
  {
    id: 4,
    question: "Você tem metas financeiras definidas?",
    options: [
      "Não tenho metas definidas",
      "Tenho metas, mas não acompanho",
      "Tenho metas e tento acompanhar",
      "Tenho metas claras e acompanho regularmente"
    ],
    correctAnswer: 0,
    painPoint: "Sem metas claras, é difícil alcançar seus sonhos",
    solution: "Defina metas e acompanhe seu progresso em tempo real!"
  },
  {
    id: 5,
    question: "Quanto tempo você gasta por semana organizando suas finanças?",
    options: [
      "Não organizo minhas finanças",
      "Mais de 3 horas",
      "Entre 1 e 3 horas",
      "Menos de 1 hora"
    ],
    correctAnswer: 0,
    painPoint: "Organizar finanças manualmente consome tempo precioso",
    solution: "Automatize tudo e economize horas do seu tempo!"
  }
]

interface QuizViewProps {
  onComplete?: () => void
}

export function QuizView({ onComplete }: QuizViewProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [showFeedback, setShowFeedback] = useState(false)

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
    setShowFeedback(true)

    const newAnswers = [...answers, answerIndex]
    setAnswers(newAnswers)

    if (answerIndex === questions[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
        setShowFeedback(false)
      } else {
        setShowResult(true)
      }
    }, 2500)
  }

  const restartQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setAnswers([])
    setShowFeedback(false)
  }

  const getPainLevel = () => {
    const painfulAnswers = answers.filter((answer, index) => 
      answer === questions[index].correctAnswer
    ).length
    
    if (painfulAnswers >= 4) return "crítico"
    if (painfulAnswers >= 3) return "alto"
    if (painfulAnswers >= 2) return "médio"
    return "baixo"
  }

  if (showResult) {
    const painLevel = getPainLevel()
    
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-3xl w-full">
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full mb-4">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                Resultado do Quiz
              </h2>
              <p className="text-lg text-gray-600">
                Descobrimos como podemos ajudar você!
              </p>
            </div>

            {painLevel === "crítico" && (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 mb-6">
                <h3 className="text-xl font-bold text-red-800 mb-3 flex items-center gap-2">
                  <XCircle className="w-6 h-6" />
                  Situação Crítica Detectada
                </h3>
                <p className="text-red-700 mb-4">
                  Suas respostas indicam que você está enfrentando sérios desafios financeiros. 
                  Sem controle adequado, você pode estar perdendo dinheiro com multas, juros e 
                  oportunidades de economia.
                </p>
                <div className="bg-white rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Problemas Identificados:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span>
                      <span>Falta de controle sobre gastos mensais</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span>
                      <span>Risco de multas por esquecimento de contas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span>
                      <span>Ausência de metas financeiras claras</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span>
                      <span>Tempo desperdiçado tentando organizar finanças</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {painLevel === "alto" && (
              <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-6 mb-6">
                <h3 className="text-xl font-bold text-orange-800 mb-3 flex items-center gap-2">
                  <Target className="w-6 h-6" />
                  Atenção Necessária
                </h3>
                <p className="text-orange-700 mb-4">
                  Você tem algum controle, mas está deixando dinheiro na mesa. 
                  Com as ferramentas certas, você pode economizar muito mais!
                </p>
              </div>
            )}

            {painLevel === "médio" && (
              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 mb-6">
                <h3 className="text-xl font-bold text-yellow-800 mb-3 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6" />
                  Você Pode Melhorar
                </h3>
                <p className="text-yellow-700 mb-4">
                  Você está no caminho certo, mas ainda há espaço para otimização. 
                  Automatize e alcance seus objetivos mais rápido!
                </p>
              </div>
            )}

            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 md:p-8 mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-7 h-7 text-emerald-600" />
                Como o Finanças em Dia Resolve Isso
              </h3>
              
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <PiggyBank className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Controle Automático</h4>
                      <p className="text-gray-600 text-sm">
                        Registre receitas e despesas em segundos. Veja exatamente para onde seu dinheiro está indo.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Target className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Alertas Inteligentes</h4>
                      <p className="text-gray-600 text-sm">
                        Nunca mais pague multas! Receba lembretes de contas a vencer e prazos importantes.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Metas e Progresso</h4>
                      <p className="text-gray-600 text-sm">
                        Defina objetivos financeiros e acompanhe seu progresso em tempo real com gráficos motivadores.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-5 h-5 text-pink-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Economia de Tempo</h4>
                      <p className="text-gray-600 text-sm">
                        Automatize tudo e economize horas por semana. Mais tempo para o que realmente importa!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={onComplete}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold py-4 px-8 rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 text-lg"
              >
                <span>Entrar no Aplicativo</span>
                <ArrowRight className="w-6 h-6" />
              </button>

              <div className="text-center">
                <button
                  onClick={restartQuiz}
                  className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
                >
                  Refazer o Quiz
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const question = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-3xl w-full">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10">
          {/* Header do Quiz */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full mb-4">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Finanças em Dia
            </h1>
            <p className="text-gray-600">
              Descubra como podemos ajudar você a organizar suas finanças
            </p>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-600">
                Pergunta {currentQuestion + 1} de {questions.length}
              </span>
              <span className="text-sm font-medium text-emerald-600">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
            {question.question}
          </h2>

          <div className="space-y-4 mb-8">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => !showFeedback && handleAnswer(index)}
                disabled={showFeedback}
                className={`w-full text-left p-4 md:p-5 rounded-xl border-2 transition-all ${
                  showFeedback && selectedAnswer === index
                    ? index === question.correctAnswer
                      ? "border-emerald-500 bg-emerald-50"
                      : "border-red-500 bg-red-50"
                    : "border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/50"
                } ${showFeedback ? "cursor-not-allowed" : "cursor-pointer"}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-gray-800 font-medium">{option}</span>
                  {showFeedback && selectedAnswer === index && (
                    index === question.correctAnswer ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                    )
                  )}
                </div>
              </button>
            ))}
          </div>

          {showFeedback && (
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-5 md:p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="font-bold text-amber-900 mb-2 text-lg">
                💡 {question.painPoint}
              </h3>
              <p className="text-amber-800 mb-3">
                {question.solution}
              </p>
              <div className="flex items-center gap-2 text-emerald-700 font-medium">
                <ArrowRight className="w-5 h-5" />
                <span>Próxima pergunta...</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
