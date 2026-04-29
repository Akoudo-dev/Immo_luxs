import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '../components/Button'
import PropertyCard from '../components/PropertyCard'
import SearchBar from '../components/SearchBar'
import { fetchProperties } from '../services/api'
import type { Property } from '../types'

const testimonials = [
  {
    quote: 'Une expérience haut de gamme, des agents disponibles et une sélection de biens exceptionnelle.',
    name: 'Claire B.',
    title: 'Acheteuse satisfaite'
  },
  {
    quote: 'Immo_Luxe m’a aidé à trouver la villa parfaite en un temps record.',
    name: 'Lucas T.',
    title: 'Investisseur immobilier'
  },
  {
    quote: 'Service premium, conseils personnalisés et suivi professionnel.',
    name: 'Sofia M.',
    title: 'Locataire sélecte'
  }
]

export default function Home() {
  const [featured, setFeatured] = useState<Property[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    fetchProperties().then(data => setFeatured(data.slice(0, 4)))
  }, [])

  return (
    <div className="space-y-12 sm:space-y-20">
      <section className="relative overflow-hidden rounded-[20px] sm:rounded-[40px] bg-[radial-gradient(circle_at_top,_rgba(245,158,11,0.18),_transparent_45%),_linear-gradient(180deg,_rgba(15,23,42,0.96),_rgba(15,23,42,0.88))] p-6 sm:p-8 lg:p-16">
        <div className="mx-auto max-w-screen-2xl">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-12">
            <div className="space-y-6 sm:space-y-8">
              <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                <p className="text-xs sm:text-sm uppercase tracking-[0.36em] text-amber-300">Immobilier de luxe</p>
                <h1 className="mt-3 sm:mt-4 max-w-xl text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight text-white">
                  Trouvez votre propriété d'exception avec Immo_Luxe
                </h1>
                <p className="mt-4 sm:mt-6 max-w-2xl text-sm sm:text-base leading-6 sm:leading-8 text-slate-300">
                  Plateforme premium pour l'achat, la location et la mise en relation avec des agents experts du marché de prestige.
                </p>
                <div className="mt-6 sm:mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
                  <Button className="w-full sm:w-auto text-sm sm:text-base" onClick={() => navigate('/properties')}>
                    Voir les biens
                  </Button>
                  <Button variant="ghost" className="w-full sm:w-auto text-sm sm:text-base" onClick={() => navigate('/contact')}>
                    Contactez un agent
                  </Button>
                </div>
              </motion.div>
            </div>

            <div className="relative rounded-[15px] bg-[url('https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1400&q=80')] bg-cover bg-center p-4 sm:p-6 lg:p-8 text-white">
              <div className="flex h-full min-h-[280px] sm:min-h-[360px] lg:min-h-[480px] flex-col justify-center rounded-[15px] bg-slate-950/20 p-4 sm:p-6 lg:p-8">
                <div>
                  <p className="text-xs sm:text-sm uppercase tracking-[0.24em] text-amber-200">Sélection premium</p>
                  <p className="mt-3 sm:mt-4 text-xl sm:text-2xl lg:text-3xl font-semibold leading-tight">
                    Séjour de prestige, architecture contemporaine et lieux rares.
                  </p>
                </div>
                <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4 rounded-2xl sm:rounded-3xl border border-white/10 bg-slate-950/60 p-4 sm:p-6">
                  <p className="text-xs sm:text-sm text-slate-200">Rejoignez notre communauté de clients exigeants et bénéficiez d'un accompagnement personnalisé.</p>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                    
                    <div>
                      <p className="font-semibold text-sm sm:text-base">Service VIP</p>
                      <p className="text-xs sm:text-sm text-slate-300">Visites privées, évaluation sur mesure, contrats sécurisés.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.36em] text-amber-300">Recherche</p>
            <h2 className="mt-3 text-3xl lg:text-4xl font-semibold text-white">Trouvez votre résidence idéale</h2>
          </div>
        </div>

        <SearchBar
          onSearch={({ location, maxPrice, type }) =>
            navigate(`/properties?location=${encodeURIComponent(location)}&maxPrice=${maxPrice}&type=${encodeURIComponent(type)}`)
          }
        />
      </section>

      <section className="space-y-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.36em] text-amber-300">En vedette</p>
            <h2 className="mt-3 text-2xl lg:text-3xl font-semibold text-white">Biens exclusifs</h2>
          </div>
          <p className="text-sm text-slate-400 max-w-md">Sélection de propriétés haut de gamme, soigneusement choisies.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {featured.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>

      <section className="grid gap-8 lg:gap-10 lg:grid-cols-3">
        <article className="rounded-[28px] border border-slate-800 bg-slate-900/90 p-6 lg:p-8 shadow-xl shadow-black/15">
          <p className="text-sm uppercase tracking-[0.36em] text-amber-300">Pourquoi Immo_Luxe</p>
          <h3 className="mt-4 text-xl lg:text-2xl font-semibold text-white">Accompagnement personnel et réseau international</h3>
          <p className="mt-4 text-sm leading-7 text-slate-300">
            Nous aidons chaque client à trouver un bien de prestige avec un suivi sur mesure et une sélection rigoureuse.
          </p>
        </article>

        <article className="rounded-[28px] border border-slate-800 bg-slate-900/90 p-6 lg:p-8 shadow-xl shadow-black/15">
          <p className="text-sm uppercase tracking-[0.36em] text-amber-300">Expertise</p>
          <h3 className="mt-4 text-xl lg:text-2xl font-semibold text-white">Service haut de gamme</h3>
          <p className="mt-4 text-sm leading-7 text-slate-300">
            De l’estimation à la transaction, notre équipe fournit transparence, rapidité et confidentialité.
          </p>
        </article>

        <article className="rounded-[28px] border border-slate-800 bg-slate-900/90 p-6 lg:p-8 shadow-xl shadow-black/15">
          <p className="text-sm uppercase tracking-[0.36em] text-amber-300">Sérénité</p>
          <h3 className="mt-4 text-xl lg:text-2xl font-semibold text-white">Expérience client raffinée</h3>
          <p className="mt-4 text-sm leading-7 text-slate-300">
            Un parcours digital moderne, une interface responsive et des échanges dédiés VIP.
          </p>
        </article>
      </section>

      <section className="space-y-8">
        <div>
          <p className="text-sm uppercase tracking-[0.36em] text-amber-300">Témoignages</p>
          <h2 className="mt-3 text-2xl lg:text-3xl font-semibold text-white">Ils nous ont fait confiance</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map(item => (
            <article key={item.name} className="rounded-[28px] border border-slate-800 bg-slate-900/90 p-6 lg:p-8 shadow-xl shadow-black/15">
              <p className="text-sm leading-7 text-slate-300">“{item.quote}”</p>
              <div className="mt-6 border-t border-slate-800 pt-5">
                <p className="font-semibold text-white">{item.name}</p>
                <p className="text-sm text-slate-400">{item.title}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
