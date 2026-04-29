import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { getContactMessages, updateMessageStatus, deleteMessage, type ContactMessage } from '../../services/mockData'

export default function Messages() {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [filter, setFilter] = useState<'all' | 'new' | 'read' | 'responded'>('all')

  useEffect(() => {
    const loadMessages = () => {
      const contactMessages = getContactMessages()
      setMessages(contactMessages)
    }

    loadMessages()
    
    // Recharger les messages toutes les 5 secondes pour les mises à jour temps réel
    const interval = setInterval(loadMessages, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleStatusChange = (messageId: string, status: ContactMessage['status']) => {
    updateMessageStatus(messageId, status)
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, status } : msg
    ))
  }

  const handleDelete = (messageId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce message ?')) {
      deleteMessage(messageId)
      setMessages(prev => prev.filter(msg => msg.id !== messageId))
    }
  }

  const filteredMessages = messages.filter(msg => 
    filter === 'all' || msg.status === filter
  )

  const getStatusColor = (status: ContactMessage['status']) => {
    switch (status) {
      case 'new': return 'bg-red-500'
      case 'read': return 'bg-blue-500'
      case 'responded': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusText = (status: ContactMessage['status']) => {
    switch (status) {
      case 'new': return 'Nouveau'
      case 'read': return 'Lu'
      case 'responded': return 'Répondu'
      default: return status
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Messages de contact</h1>
        <div className="flex items-center space-x-2 text-sm text-slate-400">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>Temps réel</span>
        </div>
      </div>

      {/* Filtres */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'all' 
                ? 'bg-amber-500 text-slate-950' 
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Tous ({messages.length})
          </button>
          <button
            onClick={() => setFilter('new')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'new' 
                ? 'bg-amber-500 text-slate-950' 
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Nouveaux ({messages.filter(m => m.status === 'new').length})
          </button>
          <button
            onClick={() => setFilter('read')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'read' 
                ? 'bg-amber-500 text-slate-950' 
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Lus ({messages.filter(m => m.status === 'read').length})
          </button>
          <button
            onClick={() => setFilter('responded')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'responded' 
                ? 'bg-amber-500 text-slate-950' 
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Répondus ({messages.filter(m => m.status === 'responded').length})
          </button>
        </div>
      </div>

      {/* Liste des messages */}
      <div className="space-y-4">
        {filteredMessages.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center">
            <div className="text-4xl mb-4">📭</div>
            <h3 className="text-xl font-semibold text-white mb-2">Aucun message</h3>
            <p className="text-slate-400">
              {filter === 'all' 
                ? 'Les messages de contact apparaîtront ici.' 
                : `Aucun message ${getStatusText(filter).toLowerCase()}.`
              }
            </p>
          </div>
        ) : (
          filteredMessages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-slate-900 border border-slate-800 rounded-xl p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(message.status)}`}></div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{message.name}</h3>
                    <p className="text-slate-400 text-sm">{message.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-slate-500">
                    {message.timestamp.toLocaleDateString('fr-FR')} à {message.timestamp.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <select
                    value={message.status}
                    onChange={(e) => handleStatusChange(message.id, e.target.value as ContactMessage['status'])}
                    className="px-2 py-1 bg-slate-800 border border-slate-700 rounded text-xs text-white"
                  >
                    <option value="new">Nouveau</option>
                    <option value="read">Lu</option>
                    <option value="responded">Répondu</option>
                  </select>
                  <button
                    onClick={() => handleDelete(message.id)}
                    className="text-red-400 hover:text-red-300 text-sm"
                    title="Supprimer"
                  >
                    🗑️
                  </button>
                </div>
              </div>
              
              <div className="bg-slate-800 rounded-lg p-4">
                <p className="text-slate-300 whitespace-pre-wrap">{message.message}</p>
              </div>

              <div className="flex justify-end mt-4 space-x-2">
                <a
                  href={`mailto:${message.email}?subject=Réponse à votre message - Immo Luxe`}
                  className="px-4 py-2 bg-amber-500 text-slate-950 rounded-lg font-semibold hover:bg-amber-400 transition-colors text-sm"
                >
                  Répondre par email
                </a>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  )
}