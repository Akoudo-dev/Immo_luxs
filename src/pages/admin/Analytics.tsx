import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface ChartData {
  label: string
  value: number
  color: string
}

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('7d')
  const [stats, setStats] = useState({
    totalViews: 1247,
    uniqueVisitors: 892,
    conversionRate: 3.2,
    avgSessionTime: '4:32'
  })

  const [propertyViews] = useState<ChartData[]>([
    { label: 'Villa Florence', value: 245, color: 'bg-blue-500' },
    { label: 'Penthouse Paris', value: 189, color: 'bg-green-500' },
    { label: 'Villa Saint-Tropez', value: 156, color: 'bg-purple-500' },
    { label: 'Appartement Nice', value: 134, color: 'bg-amber-500' },
    { label: 'Terrain Lyon', value: 98, color: 'bg-red-500' }
  ])

  const [trafficSources] = useState<ChartData[]>([
    { label: 'Recherche organique', value: 45, color: 'bg-blue-500' },
    { label: 'Réseaux sociaux', value: 28, color: 'bg-green-500' },
    { label: 'Référencement', value: 15, color: 'bg-purple-500' },
    { label: 'Direct', value: 12, color: 'bg-amber-500' }
  ])

  // Simulation de données temps réel
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        totalViews: prev.totalViews + Math.floor(Math.random() * 3),
        uniqueVisitors: prev.uniqueVisitors + Math.floor(Math.random() * 2)
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Analytics</h1>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
        >
          <option value="24h">Dernières 24h</option>
          <option value="7d">7 derniers jours</option>
          <option value="30d">30 derniers jours</option>
          <option value="90d">90 derniers jours</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900 border border-slate-800 rounded-xl p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Vues totales</p>
              <p className="text-2xl font-bold text-white">{stats.totalViews.toLocaleString()}</p>
              <p className="text-green-400 text-sm">+12% vs période précédente</p>
            </div>
            <div className="text-3xl">👁️</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-slate-900 border border-slate-800 rounded-xl p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Visiteurs uniques</p>
              <p className="text-2xl font-bold text-white">{stats.uniqueVisitors.toLocaleString()}</p>
              <p className="text-green-400 text-sm">+8% vs période précédente</p>
            </div>
            <div className="text-3xl">👤</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-900 border border-slate-800 rounded-xl p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Taux de conversion</p>
              <p className="text-2xl font-bold text-white">{stats.conversionRate}%</p>
              <p className="text-amber-400 text-sm">+0.5% vs période précédente</p>
            </div>
            <div className="text-3xl">📈</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-slate-900 border border-slate-800 rounded-xl p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Temps moyen/session</p>
              <p className="text-2xl font-bold text-white">{stats.avgSessionTime}</p>
              <p className="text-blue-400 text-sm">+15s vs période précédente</p>
            </div>
            <div className="text-3xl">⏱️</div>
          </div>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Property Views Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-slate-900 border border-slate-800 rounded-xl p-6"
        >
          <h3 className="text-xl font-semibold text-white mb-6">Propriétés les plus vues</h3>
          <div className="space-y-4">
            {propertyViews.map((item, index) => (
              <div key={item.label} className="flex items-center space-x-4">
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-white text-sm font-bold">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white text-sm">{item.label}</span>
                    <span className="text-slate-400 text-sm">{item.value} vues</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${item.color}`}
                      style={{ width: `${(item.value / Math.max(...propertyViews.map(p => p.value))) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Traffic Sources */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-slate-900 border border-slate-800 rounded-xl p-6"
        >
          <h3 className="text-xl font-semibold text-white mb-6">Sources de trafic</h3>
          <div className="space-y-4">
            {trafficSources.map((source) => (
              <div key={source.label} className="flex items-center justify-between">
                <span className="text-white text-sm">{source.label}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-slate-800 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${source.color}`}
                      style={{ width: `${source.value}%` }}
                    />
                  </div>
                  <span className="text-slate-400 text-sm w-8">{source.value}%</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Real-time Activity Feed */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-900 border border-slate-800 rounded-xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white">Activité en temps réel</h3>
          <div className="flex items-center space-x-2 text-sm text-slate-400">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Live</span>
          </div>
        </div>

        <div className="space-y-4 max-h-64 overflow-y-auto">
          {Array.from({ length: 10 }, (_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center space-x-4 p-3 bg-slate-800 rounded-lg"
            >
              <div className={`w-2 h-2 rounded-full ${
                i % 4 === 0 ? 'bg-blue-500' :
                i % 4 === 1 ? 'bg-green-500' :
                i % 4 === 2 ? 'bg-amber-500' : 'bg-purple-500'
              }`} />
              <div className="flex-1">
                <p className="text-white text-sm">
                  {i % 4 === 0 ? 'Nouvelle visite sur la page d\'accueil' :
                   i % 4 === 1 ? 'Propriété ajoutée aux favoris' :
                   i % 4 === 2 ? 'Demande de contact reçue' :
                   'Consultation d\'une fiche propriété'}
                </p>
                <p className="text-slate-400 text-xs">il y a {Math.floor(Math.random() * 60)} secondes</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
