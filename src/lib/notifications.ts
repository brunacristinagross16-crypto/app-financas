// Utilitário para gerenciar notificações push
export class NotificationManager {
  static async requestPermission(): Promise<boolean> {
    if (!('Notification' in window)) {
      console.warn('Este navegador não suporta notificações')
      return false
    }

    if (Notification.permission === 'granted') {
      return true
    }

    if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission()
      return permission === 'granted'
    }

    return false
  }

  static async registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
    if (!('serviceWorker' in navigator)) {
      console.warn('Service Worker não suportado')
      return null
    }

    try {
      const registration = await navigator.serviceWorker.register('/sw.js')
      console.log('Service Worker registrado:', registration)
      return registration
    } catch (error) {
      console.error('Erro ao registrar Service Worker:', error)
      return null
    }
  }

  static async showNotification(
    title: string,
    options?: NotificationOptions
  ): Promise<void> {
    const hasPermission = await this.requestPermission()
    
    if (!hasPermission) {
      console.warn('Permissão de notificação negada')
      return
    }

    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      const registration = await navigator.serviceWorker.ready
      await registration.showNotification(title, {
        icon: '/icon.svg',
        badge: '/icon.svg',
        vibrate: [200, 100, 200],
        ...options,
      })
    } else {
      new Notification(title, {
        icon: '/icon.svg',
        ...options,
      })
    }
  }

  static async scheduleBillReminder(
    billName: string,
    dueDate: Date,
    amount: number
  ): Promise<void> {
    const now = new Date()
    const timeUntilDue = dueDate.getTime() - now.getTime()
    const oneDayBefore = timeUntilDue - (24 * 60 * 60 * 1000)

    // Notificar 1 dia antes
    if (oneDayBefore > 0) {
      setTimeout(() => {
        this.showNotification('Lembrete: Conta a Vencer Amanhã! 📅', {
          body: `${billName} - R$ ${amount.toFixed(2)} vence amanhã`,
          tag: `bill-reminder-${billName}`,
          requireInteraction: true,
        })
      }, oneDayBefore)
    }

    // Notificar no dia do vencimento
    if (timeUntilDue > 0) {
      setTimeout(() => {
        this.showNotification('⚠️ Conta Vence Hoje!', {
          body: `${billName} - R$ ${amount.toFixed(2)} vence hoje`,
          tag: `bill-due-${billName}`,
          requireInteraction: true,
        })
      }, timeUntilDue)
    }
  }

  static async notifyGoalProgress(
    goalName: string,
    currentAmount: number,
    targetAmount: number,
    percentage: number
  ): Promise<void> {
    let emoji = '🎯'
    let message = ''

    if (percentage >= 100) {
      emoji = '🎉'
      message = `Parabéns! Você alcançou sua meta: ${goalName}!`
    } else if (percentage >= 75) {
      emoji = '🚀'
      message = `Quase lá! ${goalName} está ${percentage.toFixed(0)}% completo`
    } else if (percentage >= 50) {
      emoji = '💪'
      message = `Metade do caminho! ${goalName} está ${percentage.toFixed(0)}% completo`
    } else if (percentage >= 25) {
      emoji = '📈'
      message = `Bom progresso! ${goalName} está ${percentage.toFixed(0)}% completo`
    }

    if (message) {
      await this.showNotification(`${emoji} Progresso da Meta`, {
        body: message,
        tag: `goal-progress-${goalName}`,
      })
    }
  }

  static async notifyBudgetAlert(
    category: string,
    spent: number,
    budget: number,
    percentage: number
  ): Promise<void> {
    if (percentage >= 90) {
      await this.showNotification('🚨 Alerta de Orçamento!', {
        body: `Você gastou ${percentage.toFixed(0)}% do orçamento de ${category}`,
        tag: `budget-alert-${category}`,
        requireInteraction: true,
      })
    } else if (percentage >= 75) {
      await this.showNotification('⚠️ Atenção ao Orçamento', {
        body: `Você gastou ${percentage.toFixed(0)}% do orçamento de ${category}`,
        tag: `budget-warning-${category}`,
      })
    }
  }

  static isSupported(): boolean {
    return 'Notification' in window && 'serviceWorker' in navigator
  }

  static getPermissionStatus(): NotificationPermission {
    if (!('Notification' in window)) {
      return 'denied'
    }
    return Notification.permission
  }
}
