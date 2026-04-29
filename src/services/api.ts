import { agents, properties } from './mockData'
import type { Agent, Property, SearchFilters } from '../types'

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export async function fetchProperties(filters?: SearchFilters): Promise<Property[]> {
  await delay(300)

  return properties.filter(property => {
    const locationMatch = filters?.location
      ? property.location.toLowerCase().includes(filters.location.toLowerCase())
      : true

    const priceMatch = filters?.maxPrice ? property.price <= filters.maxPrice : true

    const typeMatch = filters?.type && filters.type !== 'Tous' ? property.type === filters.type : true

    return locationMatch && priceMatch && typeMatch
  })
}

export async function fetchPropertyById(id: string): Promise<Property | undefined> {
  await delay(300)
  return properties.find(item => item.id === id)
}

export async function fetchAgents(): Promise<Agent[]> {
  await delay(300)
  return agents
}
