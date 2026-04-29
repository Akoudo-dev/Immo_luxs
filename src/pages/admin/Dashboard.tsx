import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { properties, agents, getContactMessages, type ContactMessage } from '../../services/mockData'

interface StatCardProps {
  title: string
  value: string | number
  change: string
  icon: string
  color: string
}

function StatCard({ title, value, change, icon, color }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-slate-900 border border-slate-800 rounded-xl p-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-400 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-white mt-1">{value}</p>
          <p className={`text-sm mt-2 ${color}`}>{change}</p>
        </div>
        <div className="text-3xl">{icon}</div>
      </div>
    </motion.div>
  )
}

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalProperties: properties.length,
    totalAgents: agents.length,
    totalViews: 1247,
    totalInquiries: 89,
    newMessages: 0
  })

  const [messagePreview, setMessagePreview] = useState<ContactMessage[]>([])

  const recentActivity = [
    { id: 1, action: 'Nouvelle propriété ajoutée', time: '2 min ago', type: 'property' },
    { id: 2, action: 'Agent mis à jour', time: '15 min ago', type: 'agent' },
    { id: 3, action: 'Demande de contact reçue', time: '1h ago', type: 'inquiry' },
    { id: 4, action: 'Propriété vendue', time: '2h ago', type: 'sale' },
  ]

  // Simulation de mises à jour en temps réel
  useEffect(() => {
    const updateStats = () => {
      const messages = getContactMessages()
      const newMessagesCount = messages.filter(msg => msg.status === 'new').length
      setMessagePreview(messages.slice(0, 3))

      setStats(prev => ({
        ...prev,
        totalViews: prev.totalViews + Math.floor(Math.random() * 5),
        totalInquiries: prev.totalInquiries + (Math.random() > 0.8 ? 1 : 0),
        newMessages: newMessagesCount
      }))
    }

    updateStats()

    const interval = setInterval(updateStats, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-slate-400 mt-2">Vue d'ensemble des performances et des interactions en temps réel.</p>
        </div>
        <div className="flex items-center gap-3 text-sm text-slate-400">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span>Temps réel</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard
          title="Propriétés"
          value={stats.totalProperties}
          change="+2 cette semaine"
          icon="🏠"
          color="text-green-400"
        />
        <StatCard
          title="Agents"
          value={stats.totalAgents}
          change="+1 ce mois"
          icon="👥"
          color="text-blue-400"
        />
        <StatCard
          title="Messages"
          value={stats.newMessages}
          change={`${stats.newMessages > 0 ? 'Nouveaux messages' : 'Aucun nouveau'}`}
          icon="📧"
          color={stats.newMessages > 0 ? 'text-red-400' : 'text-slate-400'}
        />
        <StatCard
          title="Demandes"
          value={stats.totalInquiries}
          change="+5 aujourd'hui"
          icon="📋"
          color="text-amber-400"
        />
      </div>

      {/* Activity and Messages */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Activité récente</h3>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.08 }}
                className="flex items-center space-x-3 p-3 bg-slate-800 rounded-lg"
              >
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'property' ? 'bg-green-500' :
                  activity.type === 'agent' ? 'bg-blue-500' :
                  activity.type === 'inquiry' ? 'bg-amber-500' :
                  activity.type === 'sale' ? 'bg-purple-500' : 'bg-gray-500'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm truncate">{activity.action}</p>
                  <p className="text-slate-400 text-xs">{activity.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Messages récents</h3>
          <div className="space-y-4">
            {messagePreview.length === 0 ? (
              <div className="rounded-xl bg-slate-800 p-6 text-slate-400 text-sm text-center">
                Aucune nouvelle communication récemment.
              </div>
            ) : (
              messagePreview.map((message) => (
                <div key={message.id} className="rounded-xl bg-slate-800 p-4">
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <div>
                      <p className="text-white font-semibold truncate">{message.name}</p>
                      <p className="text-slate-400 text-xs truncate">{message.email}</p>
                    </div>
                    <span className="text-xs text-slate-500">
                      {message.timestamp.toLocaleDateString('fr-FR')} • {message.timestamp.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-slate-300 text-sm line-clamp-3">{message.message}</p>
                </div>
              ))
            )}
          </div>
          <button className="mt-6 w-full bg-amber-500 text-slate-950 px-4 py-3 rounded-lg font-semibold hover:bg-amber-400 transition-colors">
            Voir tous les messages
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Actions rapides</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button className="w-full bg-amber-500 text-slate-950 px-4 py-3 rounded-lg font-semibold hover:bg-amber-400 transition-colors">
              + Nouvelle propriété
            </button>
            <button className="w-full bg-amber-500 text-slate-950 px-4 py-3 rounded-lg font-semibold hover:bg-amber-400 transition-colors">
              📧 Voir messages ({stats.newMessages})
            </button>
            <button className="w-full bg-slate-800 text-white px-4 py-3 rounded-lg font-semibold hover:bg-slate-700 transition-colors">
              + Nouvel agent
            </button>
            <button className="w-full bg-slate-800 text-white px-4 py-3 rounded-lg font-semibold hover:bg-slate-700 transition-colors">
              ⚙️ Paramètres
            </button>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Aperçu des performances</h3>
          <div className="grid grid-cols-1 gap-4">
            <div className="rounded-xl bg-slate-800 p-4">
              <p className="text-3xl font-bold text-green-400">94%</p>
              <p className="text-slate-400 text-sm">Taux de satisfaction</p>
            </div>
            <div className="rounded-xl bg-slate-800 p-4">
              <p className="text-3xl font-bold text-blue-400">2.3j</p>
              <p className="text-slate-400 text-sm">Temps de réponse moyen</p>
            </div>
            <div className="rounded-xl bg-slate-800 p-4">
              <p className="text-3xl font-bold text-purple-400">€2.8M</p>
              <p className="text-slate-400 text-sm">Valeur totale des biens</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
