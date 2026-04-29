import type { Agent, Property } from '../types'

export interface ContactMessage {
  id: string
  name: string
  email: string
  message: string
  timestamp: Date
  status: 'new' | 'read' | 'responded'
}

export const properties: Property[] = [
  {
    id: 'imo-001',
    title: 'Villa Florence au bord de l’eau',
    location: 'Nice, France',
    price: 2550000,
    type: 'Villa',
    beds: 5,
    baths: 6,
    area: '520 m²',
    description:
      'Résidence de prestige avec piscine à débordement, vue panoramique et finitions haut de gamme. Idéale pour les acheteurs de biens d’exception.',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1572120360610-d971b9fe5d41?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80'
    ],
    tags: ['Piscine', 'Vue mer', 'Design contemporain'],
    agentId: 'agent-001',
    rating: 4.9
  },
  {
    id: 'imo-002',
    title: 'Penthouse panoramique dans le centre',
    location: 'Paris, France',
    price: 1950000,
    type: 'Appartement',
    beds: 3,
    baths: 3,
    area: '230 m²',
    description:
      'Penthouse avec terrasse privée, finitions premium et emplacement central dans un quartier prestigieux.',
    images: [
      'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=80'
    ],
    tags: ['Terrasse', 'Proche boutiques', 'Rénové'],
    agentId: 'agent-002',
    rating: 4.8
  },
  {
    id: 'imo-003',
    title: 'Domaine privé avec parc arboré',
    location: 'Lyon, France',
    price: 1850000,
    type: 'Villa',
    beds: 4,
    baths: 4,
    area: '400 m²',
    description:
      'Demeure luxueuse sur un parc paysager, idéale pour une famille recherchant espace, discrétion et confort élite.',
    images: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80'
    ],
    tags: ['Grand jardin', 'Maison familiale', 'Intimité'],
    agentId: 'agent-003',
    rating: 4.7
  },
  {
    id: 'imo-004',
    title: 'Appartement loft avec lumière naturelle',
    location: 'Marseille, France',
    price: 950000,
    type: 'Appartement',
    beds: 2,
    baths: 2,
    area: '145 m²',
    description:
      'Loft moderne et aéré au cœur d’un quartier prisé, parfait pour une résidence secondaire ou un investissement premium.',
    images: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=80'
    ],
    tags: ['Loft', 'Luminosité', 'Investissement'],
    agentId: 'agent-001',
    rating: 4.6
  },
  {
    id: 'imo-005',
    title: 'Terrain d’exception en bordure de forêt',
    location: 'Nice, France',
    price: 770000,
    type: 'Terrain',
    beds: 0,
    baths: 0,
    area: '1200 m²',
    description:
      'Parcelle exclusive prête à recevoir un projet résidentiel haut de gamme, proche de la côte et à l’abri des regards.',
    images: [
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1493130959531-5a6a5b5f7f68?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1400&q=80'
    ],
    tags: ['Vue nature', 'Exclusivité', 'Projet sur mesure'],
    agentId: 'agent-004',
    rating: 4.5
  },
  {
    id: 'imo-006',
    title: 'Villa contemporaine avec rooftop privé',
    location: 'Saint-Tropez, France',
    price: 3350000,
    type: 'Villa',
    beds: 6,
    baths: 7,
    area: '620 m²',
    description:
      'Propriété architecturale avec rooftop, lounge extérieur et prestations ultra luxe, à deux pas du port.',
    images: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=80'
    ],
    tags: ['Rooftop', 'Design', 'Luxe absolu'],
    agentId: 'agent-002',
    rating: 5.0
  }
]

export const agents: Agent[] = [
  {
    id: 'agent-001',
    name: 'Isabelle Moreau',
    title: 'Directrice de clientèle',
    phone: '+33 6 12 34 56 78',
    email: 'isabelle@immo-luxe.fr',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    description:
      'Isabelle accompagne les acquéreurs de biens de prestige avec un service sur mesure, discrétion et expertise.',
    specialties: ['Villas de luxe', 'Résidences de prestige', 'Transactions discrètes']
  },
  {
    id: 'agent-002',
    name: 'Mathieu Laurent',
    title: 'Spécialiste résidentiel',
    phone: '+33 6 98 76 54 32',
    email: 'mathieu@immo-luxe.fr',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    description:
      'Mathieu accompagne les investisseurs et familles haut de gamme sur tout le territoire français.',
    specialties: ['Appartements de standing', 'Investissements', 'Locations saisonnières']
  },
  {
    id: 'agent-003',
    name: 'Sophie Martin',
    title: 'Conseillère luxe',
    phone: '+33 6 21 43 65 87',
    email: 'sophie@immo-luxe.fr',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    description:
      'Sophie trouve des biens rares pour les clients qui recherchent l’excellence, partout en France.',
    specialties: ['Résidences privées', 'Maisons de caractère', 'Accompagnement VIP']
  },
  {
    id: 'agent-004',
    name: 'Antoine Dubois',
    title: 'Chargé de transactions',
    phone: '+33 6 45 32 18 90',
    email: 'antoine@immo-luxe.fr',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    description:
      'Antoine offre une expertise terrain, une sélection rigoureuse et un suivi premium jusqu’à la signature.',
    specialties: ['Biens sur mesure', 'Terrains exclusifs', 'Négociations haut de gamme']
  }
]

// Système de stockage des messages de contact
const MESSAGES_STORAGE_KEY = 'immo_luxe_contact_messages'

export const getContactMessages = (): ContactMessage[] => {
  try {
    const stored = localStorage.getItem(MESSAGES_STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      // Convertir les timestamps string en Date objects
      return parsed.map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      }))
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des messages:', error)
  }
  return []
}

export const saveContactMessage = (message: Omit<ContactMessage, 'id' | 'timestamp' | 'status'>): ContactMessage => {
  const newMessage: ContactMessage = {
    ...message,
    id: `msg-${Date.now()}`,
    timestamp: new Date(),
    status: 'new'
  }

  const existingMessages = getContactMessages()
  const updatedMessages = [newMessage, ...existingMessages]

  try {
    localStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(updatedMessages))
  } catch (error) {
    console.error('Erreur lors de la sauvegarde du message:', error)
  }

  return newMessage
}

export const updateMessageStatus = (messageId: string, status: ContactMessage['status']): void => {
  const messages = getContactMessages()
  const updatedMessages = messages.map(msg =>
    msg.id === messageId ? { ...msg, status } : msg
  )

  try {
    localStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(updatedMessages))
  } catch (error) {
    console.error('Erreur lors de la mise à jour du statut du message:', error)
  }
}

export const deleteMessage = (messageId: string): void => {
  const messages = getContactMessages()
  const filteredMessages = messages.filter(msg => msg.id !== messageId)

  try {
    localStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(filteredMessages))
  } catch (error) {
    console.error('Erreur lors de la suppression du message:', error)
  }
}
