import { useState } from 'react'
import Button from './Button'
import Input from './Input'
import type { PropertyType } from '../types'

interface SearchBarProps {
  onSearch: (filters: { location: string; maxPrice: string; type: PropertyType | 'Tous' }) => void
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [location, setLocation] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [type, setType] = useState<PropertyType | 'Tous'>('Tous')

  return (
    <form
      onSubmit={event => {
        event.preventDefault()
        onSearch({ location, maxPrice, type })
      }}
      className="grid gap-4 rounded-[32px] border border-slate-800 bg-slate-950/90 p-6 shadow-2xl shadow-black/20 sm:grid-cols-[1.5fr_1fr_1fr_auto]"
    >
      <label className="space-y-2 text-sm text-slate-300">
        Ville
        <Input
          value={location}
          onChange={event => setLocation(event.target.value)}
          placeholder="Nice, Paris, Cannes..."
        />
      </label>

      <label className="space-y-2 text-sm text-slate-300">
        Prix maximum
        <Input
          type="number"
          value={maxPrice}
          onChange={event => setMaxPrice(event.target.value)}
          placeholder="€ 1 000 000"
        />
      </label>

      <label className="space-y-2 text-sm text-slate-300">
        Type de bien
        <select
          value={type}
          onChange={event => setType(event.target.value as PropertyType | 'Tous')}
          className="w-full rounded-2xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-sm text-slate-100 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
        >
          <option>Tous</option>
          <option>Villa</option>
          <option>Appartement</option>
          <option>Terrain</option>
        </select>
      </label>

      <div className="flex items-end">
        <Button type="submit" className="w-full">
          Rechercher
        </Button>
      </div>
    </form>
  )
}
