export type PropertyType = 'Villa' | 'Appartement' | 'Terrain'

export interface Property {
  id: string
  title: string
  location: string
  price: number
  type: PropertyType
  beds: number
  baths: number
  area: string
  description: string
  images: string[]
  tags: string[]
  agentId: string
  rating: number
}

export interface Agent {
  id: string
  name: string
  title: string
  phone: string
  email: string
  photo: string
  description: string
  specialties: string[]
}

export interface SearchFilters {
  location?: string
  maxPrice?: number
  type?: PropertyType | 'Tous'
}
