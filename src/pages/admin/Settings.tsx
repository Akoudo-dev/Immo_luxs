import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Settings() {
  const [settings, setSettings] = useState({
    siteName: 'Immo_Luxe',
    siteDescription: 'Plateforme premium pour l\'achat, la location et la mise en relation avec des agents experts du marché de prestige.',
    contactEmail: 'contact@immo-luxe.fr',
    contactPhone: '+33 1 23 45 67 89',
    currency: 'EUR',
    language: 'fr',
    maintenanceMode: false,
    emailNotifications: true,
    pushNotifications: false,
    autoBackup: true,
    backupFrequency: 'daily'
  })

  const [activeTab, setActiveTab] = useState('general')

  const handleSave = () => {
    // Simulation de sauvegarde
    alert('Paramètres sauvegardés avec succès !')
  }

  const tabs = [
    { id: 'general', label: 'Général', icon: '⚙️' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'security', label: 'Sécurité', icon: '🔒' },
    { id: 'backup', label: 'Sauvegarde', icon: '💾' }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Paramètres</h1>
        <button
          onClick={handleSave}
          className="bg-amber-500 text-slate-950 px-6 py-2 rounded-lg font-semibold hover:bg-amber-400 transition-colors"
        >
          Sauvegarder
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-slate-800">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-amber-400 border-b-2 border-amber-400 bg-slate-800/50'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'general' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Informations générales</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Nom du site
                    </label>
                    <input
                      type="text"
                      value={settings.siteName}
                      onChange={(e) => setSettings(prev => ({ ...prev, siteName: e.target.value }))}
                      className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Devise
                    </label>
                    <select
                      value={settings.currency}
                      onChange={(e) => setSettings(prev => ({ ...prev, currency: e.target.value }))}
                      className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                    >
                      <option value="EUR">EUR (€)</option>
                      <option value="USD">USD ($)</option>
                      <option value="GBP">GBP (£)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Email de contact
                    </label>
                    <input
                      type="email"
                      value={settings.contactEmail}
                      onChange={(e) => setSettings(prev => ({ ...prev, contactEmail: e.target.value }))}
                      className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      value={settings.contactPhone}
                      onChange={(e) => setSettings(prev => ({ ...prev, contactPhone: e.target.value }))}
                      className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Description du site
                  </label>
                  <textarea
                    value={settings.siteDescription}
                    onChange={(e) => setSettings(prev => ({ ...prev, siteDescription: e.target.value }))}
                    rows={3}
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="maintenance"
                  checked={settings.maintenanceMode}
                  onChange={(e) => setSettings(prev => ({ ...prev, maintenanceMode: e.target.checked }))}
                  className="w-4 h-4 text-amber-500 bg-slate-800 border-slate-700 rounded"
                />
                <label htmlFor="maintenance" className="text-slate-300">
                  Mode maintenance (site indisponible pour les visiteurs)
                </label>
              </div>
            </motion.div>
          )}

          {activeTab === 'notifications' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Préférences de notifications</h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-800 rounded-lg">
                  <div>
                    <h4 className="text-white font-medium">Notifications par email</h4>
                    <p className="text-slate-400 text-sm">Recevoir des notifications pour les nouvelles demandes de contact</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.emailNotifications}
                      onChange={(e) => setSettings(prev => ({ ...prev, emailNotifications: e.target.checked }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-800 rounded-lg">
                  <div>
                    <h4 className="text-white font-medium">Notifications push</h4>
                    <p className="text-slate-400 text-sm">Recevoir des notifications push dans le navigateur</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.pushNotifications}
                      onChange={(e) => setSettings(prev => ({ ...prev, pushNotifications: e.target.checked }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                  </label>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'security' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Sécurité</h3>

              <div className="space-y-4">
                <div className="p-4 bg-slate-800 rounded-lg">
                  <h4 className="text-white font-medium mb-2">Changer le mot de passe admin</h4>
                  <div className="space-y-3">
                    <input
                      type="password"
                      placeholder="Mot de passe actuel"
                      className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                    />
                    <input
                      type="password"
                      placeholder="Nouveau mot de passe"
                      className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                    />
                    <input
                      type="password"
                      placeholder="Confirmer le nouveau mot de passe"
                      className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                    />
                    <button className="bg-amber-500 text-slate-950 px-4 py-2 rounded-lg font-semibold hover:bg-amber-400">
                      Changer le mot de passe
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-slate-800 rounded-lg">
                  <h4 className="text-white font-medium mb-2">Sessions actives</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-slate-700 rounded">
                      <div>
                        <p className="text-white text-sm">Session actuelle</p>
                        <p className="text-slate-400 text-xs">Chrome • Windows • 192.168.1.1</p>
                      </div>
                      <span className="text-green-400 text-xs">Active</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'backup' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Sauvegarde automatique</h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-800 rounded-lg">
                  <div>
                    <h4 className="text-white font-medium">Sauvegarde automatique</h4>
                    <p className="text-slate-400 text-sm">Activer les sauvegardes automatiques des données</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.autoBackup}
                      onChange={(e) => setSettings(prev => ({ ...prev, autoBackup: e.target.checked }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Fréquence de sauvegarde
                  </label>
                  <select
                    value={settings.backupFrequency}
                    onChange={(e) => setSettings(prev => ({ ...prev, backupFrequency: e.target.value }))}
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                  >
                    <option value="hourly">Toutes les heures</option>
                    <option value="daily">Quotidienne</option>
                    <option value="weekly">Hebdomadaire</option>
                    <option value="monthly">Mensuelle</option>
                  </select>
                </div>

                <div className="flex space-x-3">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-400">
                    Sauvegarder maintenant
                  </button>
                  <button className="bg-slate-700 text-white px-4 py-2 rounded-lg font-semibold hover:bg-slate-600">
                    Télécharger dernière sauvegarde
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
