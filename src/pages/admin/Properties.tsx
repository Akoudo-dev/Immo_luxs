import { useState } from 'react'
import { motion } from 'framer-motion'
import { properties as initialProperties } from '../../services/mockData'
import type { Property } from '../../types'

export default function Properties() {
  const [properties, setProperties] = useState<Property[]>(initialProperties)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<string>('Tous')
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingProperty, setEditingProperty] = useState<Property | null>(null)

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'Tous' || property.type === filterType
    return matchesSearch && matchesType
  })

  const handleDelete = (id: string) => {
    setProperties(prev => prev.filter(p => p.id !== id))
  }

  const handleAdd = (property: Omit<Property, 'id'>) => {
    const newProperty: Property = {
      ...property,
      id: `imo-${Date.now()}`
    }
    setProperties(prev => [...prev, newProperty])
    setShowAddModal(false)
  }

  const handleEdit = (property: Property) => {
    setProperties(prev => prev.map(p => p.id === property.id ? property : p))
    setEditingProperty(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Gestion des Propriétés</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-amber-500 text-slate-950 px-4 py-2 rounded-lg font-semibold hover:bg-amber-400 transition-colors"
        >
          + Nouvelle propriété
        </button>
      </div>

      {/* Filters */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Rechercher par titre ou ville..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400"
          />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
          >
            <option value="Tous">Tous types</option>
            <option value="Villa">Villa</option>
            <option value="Appartement">Appartement</option>
            <option value="Terrain">Terrain</option>
          </select>
        </div>
      </div>

      {/* Properties Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Propriété</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Prix</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Localisation</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredProperties.map((property) => (
                <motion.tr
                  key={property.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-slate-800/50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={property.images[0]}
                        alt={property.title}
                        className="w-12 h-12 rounded-lg object-cover mr-3"
                      />
                      <div>
                        <div className="text-sm font-medium text-white">{property.title}</div>
                        <div className="text-sm text-slate-400">{property.beds} ch. • {property.baths} sdb</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs rounded-full bg-amber-500/20 text-amber-300">
                      {property.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-semibold">
                    €{property.price.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                    {property.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setEditingProperty(property)}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDelete(property.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {(showAddModal || editingProperty) && (
        <PropertyModal
          property={editingProperty}
          onSave={editingProperty ? handleEdit : handleAdd}
          onClose={() => {
            setShowAddModal(false)
            setEditingProperty(null)
          }}
        />
      )}
    </div>
  )
}

interface PropertyModalProps {
  property?: Property | null
  onSave: (property: any) => void
  onClose: () => void
}

function PropertyModal({ property, onSave, onClose }: PropertyModalProps) {
  const [formData, setFormData] = useState({
    title: property?.title || '',
    location: property?.location || '',
    price: property?.price || 0,
    type: property?.type || 'Villa',
    beds: property?.beds || 1,
    baths: property?.baths || 1,
    area: property?.area || '',
    description: property?.description || '',
    images: property?.images || [''],
    tags: property?.tags || [],
    agentId: property?.agentId || 'agent-001'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
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
            {property ? 'Modifier la propriété' : 'Nouvelle propriété'}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Titre"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
              required
            />
            <input
              type="text"
              placeholder="Localisation"
              value={formData.location}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
              required
            />
            <input
              type="number"
              placeholder="Prix"
              value={formData.price}
              onChange={(e) => setFormData(prev => ({ ...prev, price: Number(e.target.value) }))}
              className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
              required
            />
            <select
              value={formData.type}
              onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as any }))}
              className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
            >
              <option value="Villa">Villa</option>
              <option value="Appartement">Appartement</option>
              <option value="Terrain">Terrain</option>
            </select>
            <input
              type="number"
              placeholder="Chambres"
              value={formData.beds}
              onChange={(e) => setFormData(prev => ({ ...prev, beds: Number(e.target.value) }))}
              className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
            />
            <input
              type="number"
              placeholder="Salles de bain"
              value={formData.baths}
              onChange={(e) => setFormData(prev => ({ ...prev, baths: Number(e.target.value) }))}
              className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
            />
          </div>

          <input
            type="text"
            placeholder="Surface (ex: 200 m²)"
            value={formData.area}
            onChange={(e) => setFormData(prev => ({ ...prev, area: e.target.value }))}
            className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
          />

          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white h-24"
            required
          />

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
              {property ? 'Modifier' : 'Créer'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}
