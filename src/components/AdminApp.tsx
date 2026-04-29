import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import AdminLayout from '../layouts/AdminLayout'
import Dashboard from '../pages/admin/Dashboard'
import Properties from '../pages/admin/Properties'
import Agents from '../pages/admin/Agents'
import Analytics from '../pages/admin/Analytics'
import Settings from '../pages/admin/Settings'

export default function AdminApp() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Charger l'état d'authentification depuis localStorage
    const stored = localStorage.getItem('adminAuthenticated')
    return stored === 'true'
  })
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    // Sauvegarder l'état d'authentification dans localStorage
    localStorage.setItem('adminAuthenticated', isAuthenticated.toString())
  }, [isAuthenticated])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === 'admin123') {
      setIsAuthenticated(true)
      setError('')
    } else {
      setError('Mot de passe incorrect')
      setPassword('')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.setItem('adminAuthenticated', 'false')
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 max-w-md w-full shadow-2xl">
          <div className="text-center mb-8">
            <div className="text-4xl mb-3">🔐</div>
            <h2 className="text-3xl font-bold text-white">Admin Panel</h2>
            <p className="text-slate-400 text-sm mt-2">Connexion sécurisée</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setError('')
                }}
                placeholder="Mot de passe"
                className={`w-full p-3 rounded-lg bg-slate-800 border text-white transition-colors ${
                  error ? 'border-red-500' : 'border-slate-700 focus:border-amber-500'
                } focus:outline-none focus:ring-2 focus:ring-amber-500/20`}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-slate-400 hover:text-white transition-colors"
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>

            {error && (
              <div className="p-3 bg-red-500/20 border border-red-500 rounded-lg">
                <p className="text-red-400 text-sm font-medium">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={!password}
              className="w-full bg-amber-500 text-slate-950 py-3 rounded-lg font-semibold hover:bg-amber-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Se connecter
            </button>
          </form>

          <div className="mt-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
            <p className="text-amber-300 text-xs text-center">
              📧 Environnement de démonstration<br/>
              <span className="text-slate-400">Utilisez les identifiants de test fournis par l'administrateur</span>
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <AdminLayout onLogout={handleLogout}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/agents" element={<Agents />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </AdminLayout>
  )
}
