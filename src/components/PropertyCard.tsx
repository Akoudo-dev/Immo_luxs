import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'
import type { Property } from '../types'

interface PropertyCardProps {
  property: Property
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites()

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="group overflow-hidden rounded-[28px] border border-slate-800 bg-slate-900/90 shadow-xl shadow-black/20"
    >
      <div className="relative overflow-hidden">
        <img
          src={property.images[0]}
          alt={property.title}
          className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <button
          type="button"
          aria-label="Ajouter aux favoris"
          onClick={() => toggleFavorite(property.id)}
          className="absolute right-4 top-4 rounded-full bg-slate-950/80 p-3 text-amber-300 transition hover:bg-slate-900"
        >
          {isFavorite(property.id) ? '♥' : '♡'}
        </button>
      </div>

      <div className="space-y-4 p-6">
        <div className="flex items-center justify-between gap-3">
          <p className="rounded-full bg-amber-500/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-amber-300">
            {property.type}
          </p>
          <p className="text-sm text-slate-400">{property.location}</p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white">{property.title}</h3>
          <p className="mt-3 text-sm leading-6 text-slate-400 line-clamp-3">{property.description}</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <span className="rounded-2xl bg-slate-950 px-3 py-2 text-sm text-slate-300">{property.beds} chambres</span>
          <span className="rounded-2xl bg-slate-950 px-3 py-2 text-sm text-slate-300">{property.baths} salles de bain</span>
        </div>

        <div className="flex items-center justify-between gap-4">
          <p className="text-xl font-semibold text-white">€{property.price.toLocaleString()}</p>
          <Link
            to={`/properties/${property.id}`}
            className="rounded-full bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-amber-400"
          >
            Voir
          </Link>
        </div>
      </div>
    </motion.article>
  )
}
