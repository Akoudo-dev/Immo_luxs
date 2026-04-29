import type { ChangeEvent } from 'react'
import Button from './Button'
import Input from './Input'
import type { PropertyType, SearchFilters } from '../types'

interface FilterSidebarProps {
  filters: SearchFilters
  onChange: (filters: SearchFilters) => void
  onClear: () => void
}

export default function FilterSidebar({ filters, onChange, onClear }: FilterSidebarProps) {
  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...filters,
      [event.target.name]: event.target.name === 'maxPrice'
        ? Number(event.target.value) || undefined
        : event.target.value
    })
  }

  return (
    <aside className="space-y-6 rounded-[28px] border border-slate-800 bg-slate-900/90 p-6 text-slate-300">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white">Filtres</p>
        <p className="mt-2 text-sm text-slate-400">Affinez les résultats selon vos critères.</p>
      </div>

      <label className="space-y-2 text-sm">
        Ville
        <Input
          name="location"
          value={filters.location ?? ''}
          onChange={handleInput}
          placeholder="Nice, Paris..."
        />
      </label>

      <label className="space-y-2 text-sm">
        Prix maximum
        <Input
          name="maxPrice"
          type="number"
          value={filters.maxPrice ?? ''}
          onChange={handleInput}
          placeholder="800000"
        />
      </label>

      <label className="space-y-2 text-sm">
        Type
        <select
          value={filters.type ?? 'Tous'}
          onChange={event => onChange({ ...filters, type: event.target.value as PropertyType | 'Tous' })}
          className="w-full rounded-2xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-sm text-slate-100 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
        >
          <option value="Tous">Tous</option>
          <option value="Villa">Villa</option>
          <option value="Appartement">Appartement</option>
          <option value="Terrain">Terrain</option>
        </select>
      </label>

      <Button type="button" variant="ghost" onClick={onClear} className="w-full">
        Réinitialiser
      </Button>
    </aside>
  )
}
