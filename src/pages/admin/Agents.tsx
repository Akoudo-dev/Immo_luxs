import { useState } from 'react'
import { motion } from 'framer-motion'
import { agents as initialAgents } from '../../services/mockData'
import type { Agent } from '../../types'

export default function Agents() {
  const [agents, setAgents] = useState<Agent[]>(initialAgents)
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingAgent, setEditingAgent] = useState<Agent | null>(null)

  const filteredAgents = agents.filter(agent =>
    agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDelete = (id: string) => {
    setAgents(prev => prev.filter(a => a.id !== id))
  }

  const handleAdd = (agent: Omit<Agent, 'id'>) => {
    const newAgent: Agent = {
      ...agent,
      id: `agent-${Date.now()}`
    }
    setAgents(prev => [...prev, newAgent])
    setShowAddModal(false)
  }

  const handleEdit = (agent: Agent) => {
    setAgents(prev => prev.map(a => a.id === agent.id ? agent : a))
    setEditingAgent(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Gestion des Agents</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-amber-500 text-slate-950 px-4 py-2 rounded-lg font-semibold hover:bg-amber-400 transition-colors"
        >
          + Nouvel agent
        </button>
      </div>

      {/* Search */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
        <input
          type="text"
          placeholder="Rechercher par nom ou titre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400"
        />
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAgents.map((agent) => (
          <motion.div
            key={agent.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-900 border border-slate-800 rounded-xl p-6"
          >
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={agent.photo}
                alt={agent.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="text-lg font-semibold text-white">{agent.name}</h3>
                <p className="text-amber-400 text-sm">{agent.title}</p>
              </div>
            </div>

            <p className="text-slate-300 text-sm mb-4 line-clamp-3">{agent.description}</p>

            <div className="space-y-2 text-sm text-slate-400 mb-4">
              <p>📞 {agent.phone}</p>
              <p>✉️ {agent.email}</p>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {agent.specialties.map((specialty) => (
                <span
                  key={specialty}
                  className="px-2 py-1 bg-amber-500/20 text-amber-300 text-xs rounded-full"
                >
                  {specialty}
                </span>
              ))}
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => setEditingAgent(agent)}
                className="flex-1 bg-blue-500 text-white px-3 py-2 rounded-lg text-sm font-semibold hover:bg-blue-400 transition-colors"
              >
                Modifier
              </button>
              <button
                onClick={() => handleDelete(agent.id)}
                className="flex-1 bg-red-500 text-white px-3 py-2 rounded-lg text-sm font-semibold hover:bg-red-400 transition-colors"
              >
                Supprimer
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {(showAddModal || editingAgent) && (
        <AgentModal
          agent={editingAgent}
          onSave={editingAgent ? handleEdit : handleAdd}
          onClose={() => {
            setShowAddModal(false)
            setEditingAgent(null)
          }}
        />
      )}
    </div>
  )
}

interface AgentModalProps {
  agent?: Agent | null
  onSave: (agent: any) => void
  onClose: () => void
}

function AgentModal({ agent, onSave, onClose }: AgentModalProps) {
  const [formData, setFormData] = useState({
    name: agent?.name || '',
    title: agent?.title || '',
    phone: agent?.phone || '',
    email: agent?.email || '',
    photo: agent?.photo || '',
    description: agent?.description || '',
    specialties: agent?.specialties || ['']
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  const addSpecialty = () => {
    setFormData(prev => ({ ...prev, specialties: [...prev.specialties, ''] }))
  }

  const updateSpecialty = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      specialties: prev.specialties.map((s, i) => i === index ? value : s)
    }))
  }

  const removeSpecialty = (index: number) => {
    setFormData(prev => ({
      ...prev,
      specialties: prev.specialties.filter((_, i) => i !== index)
    }))
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-slate-900 border border-slate-800 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">
            {agent ? 'Modifier l\'agent' : 'Nouvel agent'}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Nom complet"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
              required
            />
            <input
              type="text"
              placeholder="Titre (ex: Directeur de clientèle)"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
              required
            />
            <input
              type="tel"
              placeholder="Téléphone"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
              required
            />
          </div>

          <input
            type="url"
            placeholder="URL de la photo"
            value={formData.photo}
            onChange={(e) => setFormData(prev => ({ ...prev, photo: e.target.value }))}
            className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
            required
          />

          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white h-24"
            required
          />

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-white text-sm font-medium">Spécialités</label>
              <button
                type="button"
                onClick={addSpecialty}
                className="text-amber-400 text-sm hover:text-amber-300"
              >
                + Ajouter
              </button>
            </div>
            <div className="space-y-2">
              {formData.specialties.map((specialty, index) => (
                <div key={index} className="flex space-x-2">
                  <input
                    type="text"
                    value={specialty}
                    onChange={(e) => updateSpecialty(index, e.target.value)}
                    placeholder="Spécialité"
                    className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                  />
                  {formData.specialties.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSpecialty(index)}
                      className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-400"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-amber-500 text-slate-950 rounded-lg font-semibold hover:bg-amber-400"
            >
              {agent ? 'Modifier' : 'Créer'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}
