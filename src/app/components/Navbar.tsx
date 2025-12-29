"use client"

import { Bell, Settings, User } from "lucide-react"

export function Navbar() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg">F</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Finanças em Dia</h1>
              <p className="text-xs text-gray-500">Organize suas finanças</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Settings className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <User className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
