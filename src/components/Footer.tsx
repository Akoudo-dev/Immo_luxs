export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950/95 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-screen-2xl text-slate-400">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="text-xl font-semibold text-white">Immo_Luxe</p>
            <p className="mt-3 text-sm leading-7">
              Plateforme de prestige dédiée aux biens immobiliers de luxe, aux locations haut de gamme et
              aux services personnalisés.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-300">Contact</p>
            <p className="mt-3 text-sm">contact@immo-luxe.fr</p>
            <p className="mt-2 text-sm">+33 1 23 45 67 89</p>
            <p className="mt-2 text-sm">Paris, France</p>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-300">Services</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>Recherche de biens</li>
              <li>Mise en relation agents</li>
              <li>Accompagnement VIP</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-800 pt-6 text-center text-sm text-slate-500">
          © 2026 Immo_Luxe. Tous droits réservés.
        </div>
      </div>
    </footer>
  )
}
