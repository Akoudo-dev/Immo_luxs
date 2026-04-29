import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Button from '../components/Button'
import FilterSidebar from '../components/FilterSidebar'
import LoadingSpinner from '../components/LoadingSpinner'
import PropertyCard from '../components/PropertyCard'
import { fetchProperties } from '../services/api'
import type { Property, SearchFilters } from '../types'

const pageSize = 6

function parseFilters(searchParams: URLSearchParams): SearchFilters {
  return {
    location: searchParams.get('location') ?? undefined,
    maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
    type: (searchParams.get('type') as Property['type']) ?? 'Tous'
  }
}

export default function Properties() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [searchParams, setSearchParams] = useSearchParams()
  const [page, setPage] = useState(1)

  const filters = useMemo(() => parseFilters(searchParams), [searchParams])

  useEffect(() => {
    setLoading(true)
    fetchProperties(filters)
      .then(data => {
        setProperties(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [filters])

  const totalPages = Math.max(1, Math.ceil(properties.length / pageSize))
  const visibleProperties = properties.slice((page - 1) * pageSize, page * pageSize)

  const handleClear = () => {
    setSearchParams({})
    setPage(1)
  }

  return (
    <div className="space-y-12">
      <section className="relative overflow-hidden rounded-[40px] bg-[radial-gradient(circle_at_top,_rgba(245,158,11,0.18),_transparent_45%),_linear-gradient(180deg,_rgba(15,23,42,0.96),_rgba(15,23,42,0.88))] p-8 sm:p-12 lg:p-16">
        <div className="relative rounded-[15px] bg-[url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1400&q=80')] bg-cover bg-center p-8 text-white">
          <div className="flex h-full min-h-[320px] flex-col justify-center   p-8">
            <p className="text-sm uppercase tracking-[0.36em] text-amber-300">Catalogue</p>
            <h1 className="mt-3 text-2xl lg:text-3xl font-semibold text-white">Découvrez notre sélection de biens d'exception</h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-200">
              Explorez notre catalogue complet de propriétés de prestige, villas, appartements et terrains exclusifs.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-[32px] border border-slate-800 bg-slate-900/90 p-8 shadow-xl shadow-black/20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.36em] text-amber-300">Catalogue</p>
            <h1 className="mt-3 text-3xl font-semibold text-white">Biens disponibles</h1>
          </div>
          <div className="text-sm text-slate-400">
            {properties.length} résultats trouvés
          </div>
        </div>
      </section>

      <div className="grid gap-8 xl:grid-cols-[320px_1fr]">
        <FilterSidebar
          filters={filters}
          onChange={next => {
            setSearchParams({
              ...(next.location ? { location: next.location } : {}),
              ...(next.maxPrice ? { maxPrice: String(next.maxPrice) } : {}),
              ...(next.type && next.type !== 'Tous' ? { type: next.type } : {}),
            })
            setPage(1)
          }}
          onClear={handleClear}
        />

        <div className="space-y-8">
          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {visibleProperties.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}

          {!loading && properties.length === 0 && (
            <div className="rounded-[28px] border border-slate-800 bg-slate-900/90 p-10 text-center text-slate-300">
              Aucun bien trouvé avec ces filtres. Essayez d’élargir votre recherche.
            </div>
          )}

          {!loading && properties.length > 0 && (
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-[28px] border border-slate-800 bg-slate-900/90 p-6">
              <div className="text-sm text-slate-400">
                Page {page} sur {totalPages}
              </div>
              <div className="flex flex-wrap gap-3">
                <Button
                  type="button"
                  variant="ghost"
                  disabled={page <= 1}
                  onClick={() => setPage(current => Math.max(current - 1, 1))}
                >
                  Précédent
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  disabled={page >= totalPages}
                  onClick={() => setPage(current => Math.min(current + 1, totalPages))}
                >
                  Suivant
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
