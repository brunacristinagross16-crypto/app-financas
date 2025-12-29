"use client"

import { Card } from "@/components/ui/card"
import { BookOpen, TrendingUp, PiggyBank, Target, Lightbulb, Video, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"

export function EducationView() {
  const articles = [
    {
      id: 1,
      title: "Como Criar um Orçamento Mensal Eficiente",
      description: "Aprenda a organizar suas finanças e controlar seus gastos mensais de forma prática.",
      category: "Básico",
      readTime: "5 min",
      icon: FileText,
      color: "bg-blue-100 text-blue-600"
    },
    {
      id: 2,
      title: "A Importância do Fundo de Emergência",
      description: "Entenda por que você precisa de uma reserva financeira e como construí-la.",
      category: "Essencial",
      readTime: "7 min",
      icon: PiggyBank,
      color: "bg-green-100 text-green-600"
    },
    {
      id: 3,
      title: "Investimentos para Iniciantes",
      description: "Descubra as melhores opções de investimento para quem está começando.",
      category: "Investimentos",
      readTime: "10 min",
      icon: TrendingUp,
      color: "bg-purple-100 text-purple-600"
    },
    {
      id: 4,
      title: "Como Definir Metas Financeiras Realistas",
      description: "Aprenda a estabelecer objetivos financeiros alcançáveis e motivadores.",
      category: "Planejamento",
      readTime: "6 min",
      icon: Target,
      color: "bg-orange-100 text-orange-600"
    }
  ]

  const tips = [
    {
      title: "Regra 50-30-20",
      description: "Divida sua renda: 50% necessidades, 30% desejos, 20% poupança e investimentos.",
      icon: "💰"
    },
    {
      title: "Evite Dívidas de Cartão",
      description: "Pague sempre o valor total da fatura para evitar juros altos.",
      icon: "💳"
    },
    {
      title: "Automatize Suas Economias",
      description: "Configure transferências automáticas para sua poupança todo mês.",
      icon: "🤖"
    },
    {
      title: "Compare Preços",
      description: "Antes de comprar, pesquise e compare preços em diferentes lojas.",
      icon: "🔍"
    },
    {
      title: "Revise Assinaturas",
      description: "Cancele serviços que você não usa mais para economizar dinheiro.",
      icon: "📱"
    },
    {
      title: "Cozinhe em Casa",
      description: "Preparar suas refeições pode economizar até 70% comparado a comer fora.",
      icon: "🍳"
    }
  ]

  const videos = [
    {
      title: "Educação Financeira: Por Onde Começar?",
      duration: "12:45",
      thumbnail: "bg-gradient-to-br from-blue-400 to-cyan-500"
    },
    {
      title: "Como Sair das Dívidas em 6 Passos",
      duration: "15:20",
      thumbnail: "bg-gradient-to-br from-purple-400 to-pink-500"
    },
    {
      title: "Investindo com Pouco Dinheiro",
      duration: "18:30",
      thumbnail: "bg-gradient-to-br from-green-400 to-emerald-500"
    }
  ]

  return (
    <div className="space-y-6 md:ml-64">
      {/* Header */}
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Educação Financeira</h2>
        <p className="text-gray-500 mt-1">Aprenda a gerenciar melhor suas finanças</p>
      </div>

      {/* Featured Banner */}
      <Card className="p-8 bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-0 shadow-xl">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
            <Lightbulb className="w-12 h-12" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-2xl font-bold mb-2">Dica do Dia</h3>
            <p className="text-emerald-100 text-lg">
              Comece pequeno! Economizar apenas R$ 10 por dia resulta em R$ 3.650 ao ano.
            </p>
          </div>
          <Button className="bg-white text-emerald-600 hover:bg-emerald-50">
            Saiba Mais
          </Button>
        </div>
      </Card>

      {/* Quick Tips */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Dicas Rápidas</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tips.map((tip, index) => (
            <Card key={index} className="p-5 bg-white border border-gray-200 hover:border-emerald-300 hover:shadow-lg transition-all">
              <div className="flex items-start gap-3">
                <span className="text-3xl">{tip.icon}</span>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">{tip.title}</h4>
                  <p className="text-sm text-gray-600">{tip.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Articles */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Artigos Recomendados</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {articles.map((article) => (
            <Card key={article.id} className="p-6 bg-white border border-gray-200 hover:shadow-xl transition-all group cursor-pointer">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${article.color} group-hover:scale-110 transition-transform`}>
                  <article.icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">
                      {article.category}
                    </span>
                    <span className="text-xs text-gray-500">{article.readTime}</span>
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                    {article.title}
                  </h4>
                  <p className="text-sm text-gray-600 mb-4">{article.description}</p>
                  <Button variant="ghost" className="text-emerald-600 hover:text-emerald-700 p-0 h-auto">
                    Ler artigo →
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Videos */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Vídeos Educativos</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {videos.map((video, index) => (
            <Card key={index} className="overflow-hidden border border-gray-200 hover:shadow-xl transition-all group cursor-pointer">
              <div className={`${video.thumbnail} h-48 flex items-center justify-center relative`}>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
                <div className="relative z-10 w-16 h-16 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Video className="w-8 h-8 text-emerald-600" />
                </div>
                <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/70 text-white text-xs rounded">
                  {video.duration}
                </div>
              </div>
              <div className="p-4">
                <h4 className="font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
                  {video.title}
                </h4>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Community Section */}
      <Card className="p-8 bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex p-4 bg-purple-100 rounded-full mb-4">
            <BookOpen className="w-8 h-8 text-purple-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Comunidade Finanças em Dia</h3>
          <p className="text-gray-600 mb-6">
            Junte-se a milhares de pessoas que estão transformando suas vidas financeiras. 
            Compartilhe experiências, tire dúvidas e aprenda com a comunidade.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
              Participar da Comunidade
            </Button>
            <Button variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-50">
              Ver Discussões
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
