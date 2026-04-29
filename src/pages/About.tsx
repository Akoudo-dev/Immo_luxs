export default function About() {
  return (
    <div className="space-y-12">      <section className="relative overflow-hidden rounded-[40px] bg-[radial-gradient(circle_at_top,_rgba(245,158,11,0.18),_transparent_45%),_linear-gradient(180deg,_rgba(15,23,42,0.96),_rgba(15,23,42,0.88))] p-8 sm:p-12 lg:p-16">
        <div className="relative rounded-[10px] bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80')] bg-cover bg-center p-8 text-white">
          <div className="flex h-full min-h-[320px] flex-col justify-center   p-8">
            <p className="text-sm uppercase tracking-[0.36em] text-amber-300">À propos</p>
            <h1 className="mt-3 text-2xl lg:text-3xl font-semibold text-white">Immo_Luxe, un écosystème dédié au luxe immobilier</h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-200">
              Immo_Luxe rassemble des propriétés exclusives, des experts du marché et une expérience digitale élégante.
              Nous mettons l'accent sur l'excellence, la transparence et la relation client.
            </p>
          </div>
        </div>
      </section>
      {/* <section className="rounded-[32px] border border-slate-800 bg-slate-900/90 p-8 shadow-xl shadow-black/20">
        <p className="text-sm uppercase tracking-[0.36em] text-amber-300">À propos</p>
        <h1 className="mt-3 text-3xl font-semibold text-white">Immo_Luxe, un écosystème dédié au luxe immobilier</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-400">
          Immo_Luxe rassemble des propriétés exclusives, des experts du marché et une expérience digitale élégante.
          Nous mettons l’accent sur l’excellence, la transparence et la relation client.
        </p>
      </section> */}

      <section className="grid gap-10 lg:grid-cols-3">
        <article className="rounded-[28px] border border-slate-800 bg-slate-900/90 p-8 shadow-xl shadow-black/15">
          <h2 className="text-2xl font-semibold text-white">Vision</h2>
          <p className="mt-4 text-sm leading-7 text-slate-300">
            Devenir la référence pour les clients exigeants qui veulent acheter, louer ou investir dans des biens d’exception.
          </p>
        </article>
        <article className="rounded-[28px] border border-slate-800 bg-slate-900/90 p-8 shadow-xl shadow-black/15">
          <h2 className="text-2xl font-semibold text-white">Mission</h2>
          <p className="mt-4 text-sm leading-7 text-slate-300">
            Offrir un parcours personnalisé, un réseau d’agents experts et un service durable sur l’ensemble des étapes.
          </p>
        </article>
        <article className="rounded-[28px] border border-slate-800 bg-slate-900/90 p-8 shadow-xl shadow-black/15">
          <h2 className="text-2xl font-semibold text-white">Valeurs</h2>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
            <li>• Excellence</li>
            <li>• Confiance</li>
            <li>• Confidentialité</li>
            <li>• Innovation</li>
          </ul>
        </article>
      </section>
    </div>
  )
}
