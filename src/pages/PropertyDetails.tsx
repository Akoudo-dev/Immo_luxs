import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import LoadingSpinner from '../components/LoadingSpinner'
import Button from '../components/Button'
import { fetchPropertyById, fetchAgents } from '../services/api'
import { useFavorites } from '../context/FavoritesContext'
import type { Agent, Property } from '../types'

export default function PropertyDetails() {
  const { id } = useParams()
  const [property, setProperty] = useState<Property | null>(null)
  const [agent, setAgent] = useState<Agent | null>(null)
  const [loading, setLoading] = useState(true)
  const { isFavorite, toggleFavorite } = useFavorites()

  useEffect(() => {
    if (!id) return

    setLoading(true)
    fetchPropertyById(id).then(data => {
      setProperty(data ?? null)
      setLoading(false)
    })
  }, [id])

  useEffect(() => {
    if (!property) {
      return
    }

    fetchAgents().then(allAgents => setAgent(allAgents.find(item => item.id === property.agentId) ?? null))
  }, [property])

  if (loading) {
    return <LoadingSpinner />
  }

  if (!property) {
    return (
      <div className="rounded-[28px] border border-slate-800 bg-slate-900/90 p-10 text-center text-slate-300">
        Biens introuvable. Veuillez revenir à la page des propriétés.
      </div>
    )
  }

  return (
    <div className="space-y-12">
      <section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <div className="rounded-[32px] border border-slate-800 bg-slate-900/90 p-6 shadow-xl shadow-black/20">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.36em] text-amber-300">{property.type}</p>
                <h1 className="mt-3 text-4xl font-semibold text-white">{property.title}</h1>
                <p className="mt-3 text-sm text-slate-400">{property.location}</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-semibold text-white">€{property.price.toLocaleString()}</p>
                <button
                  type="button"
                  onClick={() => toggleFavorite(property.id)}
                  className="mt-4 rounded-full border border-amber-500 px-4 py-2 text-sm font-semibold text-amber-300 transition hover:bg-amber-500/10"
                >
                  {isFavorite(property.id) ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                </button>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-[28px] overflow-hidden border border-slate-800 bg-slate-900/90 shadow-xl shadow-black/15">
              <img src={property.images[0]} alt={property.title} className="h-56 w-full object-cover" />
            </div>
            <div className="rounded-[28px] overflow-hidden border border-slate-800 bg-slate-900/90 shadow-xl shadow-black/15">
              <img src={property.images[1]} alt={property.title} className="h-56 w-full object-cover" />
            </div>
            <div className="rounded-[28px] overflow-hidden border border-slate-800 bg-slate-900/90 shadow-xl shadow-black/15">
              <img src={property.images[2]} alt={property.title} className="h-56 w-full object-cover" />
            </div>
          </div>

          <div className="rounded-[32px] border border-slate-800 bg-slate-900/90 p-8 shadow-xl shadow-black/20">
            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-amber-300">Surface</p>
                <p className="mt-2 text-lg font-semibold text-white">{property.area}</p>
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-amber-300">Chambres</p>
                <p className="mt-2 text-lg font-semibold text-white">{property.beds}</p>
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-amber-300">Salle de bain</p>
                <p className="mt-2 text-lg font-semibold text-white">{property.baths}</p>
              </div>
            </div>
          </div>

          <div className="rounded-[32px] border border-slate-800 bg-slate-900/90 p-8 shadow-xl shadow-black/20">
            <h2 className="text-2xl font-semibold text-white">Description</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">{property.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {property.tags.map(tag => (
                <span key={tag} className="rounded-full bg-amber-500/10 px-4 py-2 text-xs uppercase tracking-[0.24em] text-amber-300">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-[32px] border border-slate-800 bg-slate-900/90 p-6 shadow-xl shadow-black/20">
            <p className="text-sm uppercase tracking-[0.24em] text-amber-300">Carte</p>
            <div className="mt-4 h-[320px] rounded-3xl border border-slate-800 bg-slate-950/80 p-6 text-slate-400">
              <p className="text-sm">Carte de localisation en mockup.</p>
              <div className="mt-6 h-full rounded-3xl bg-slate-900" />
            </div>
          </div>

          <div className="rounded-[32px] border border-slate-800 bg-slate-900/90 p-6 shadow-xl shadow-black/20">
            <p className="text-sm uppercase tracking-[0.24em] text-amber-300">Agent responsable</p>
            {agent ? (
              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-4">
                  <img src={agent.photo} alt={agent.name} className="h-16 w-16 rounded-3xl object-cover" />
                  <div>
                    <p className="font-semibold text-white">{agent.name}</p>
                    <p className="text-sm text-slate-400">{agent.title}</p>
                  </div>
                </div>
                <p className="text-sm leading-7 text-slate-300">{agent.description}</p>
                <div className="space-y-2 text-sm text-slate-300">
                  <p>Tél: {agent.phone}</p>
                  <p>Email: {agent.email}</p>
                </div>
              </div>
            ) : (
              <p className="mt-4 text-sm text-slate-400">Informations de l’agent en cours de chargement.</p>
            )}
          </div>

          <div className="rounded-[32px] border border-slate-800 bg-slate-900/90 p-6 shadow-xl shadow-black/20">
            <p className="text-sm uppercase tracking-[0.24em] text-amber-300">Contact</p>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              Pour plus d’informations et une visite privée, contactez notre équipe de conseil.
            </p>
            <Button as="a" href="mailto:contact@immo-luxe.fr" className="mt-6 w-full">
              Contacter un agent
            </Button>
          </div>
        </aside>
      </section>
    </div>
  )
}
