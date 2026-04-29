import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

interface FavoritesContextValue {
  favorites: string[]
  toggleFavorite: (propertyId: string) => void
  isFavorite: (propertyId: string) => boolean
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null)

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>(() => {
    if (typeof window === 'undefined') {
      return []
    }

    try {
      return JSON.parse(window.localStorage.getItem('immo_luxe_favorites') ?? '[]') as string[]
    } catch {
      return []
    }
  })

  useEffect(() => {
    window.localStorage.setItem('immo_luxe_favorites', JSON.stringify(favorites))
  }, [favorites])

  const value = useMemo(
    () => ({
      favorites,
      toggleFavorite: (propertyId: string) => {
        setFavorites(current =>
          current.includes(propertyId)
            ? current.filter(id => id !== propertyId)
            : [...current, propertyId],
        )
      },
      isFavorite: (propertyId: string) => favorites.includes(propertyId)
    }),
    [favorites],
  )

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error('useFavorites must be used inside FavoritesProvider')
  }
  return context
}
