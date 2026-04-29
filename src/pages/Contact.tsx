import { useState } from 'react'
import Button from '../components/Button'
import Input from '../components/Input'
import { saveContactMessage } from '../services/mockData'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    
    // Sauvegarder le message
    saveContactMessage({
      name: form.name,
      email: form.email,
      message: form.message
    })
    
    setSubmitted(true)
    
    // Réinitialiser le formulaire après 3 secondes
    setTimeout(() => {
      setForm({ name: '', email: '', message: '' })
      setSubmitted(false)
    }, 3000)
  }

  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-[40px] bg-[radial-gradient(circle_at_top,_rgba(245,158,11,0.18),_transparent_45%),_linear-gradient(180deg,_rgba(15,23,42,0.96),_rgba(15,23,42,0.88))] p-8 sm:p-12 lg:p-16">
        <div className="relative rounded-[10px] bg-[url('https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&w=1400&q=80')] bg-cover bg-center p-8 text-white">
          <div className="flex h-full min-h-[480px] flex-col justify-center   p-8">
            <p className="text-sm uppercase tracking-[0.36em] text-amber-300">Contact</p>
            <h1 className="mt-3 text-4xl font-semibold text-white">Entrez en contact avec notre équipe</h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-200">
              Remplissez le formulaire et un conseiller Immo_Luxe vous contactera sous 24 heures.
            </p>
          </div>
        </div>
      </section>

     {/*  <section className="rounded-[32px] border border-slate-800 bg-slate-900/90 p-8 shadow-xl shadow-black/20">
        <p className="text-sm uppercase tracking-[0.36em] text-amber-300">Contact</p>
        <h1 className="mt-3 text-3xl font-semibold text-white">Entrez en contact avec notre équipe</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-400">
          Remplissez le formulaire et un conseiller Immo_Luxe vous contactera sous 24 heures.
        </p>
      </section> */}

      <div className="grid gap-10 lg:grid-cols-[1fr_420px]">
        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-[32px] border border-slate-800 bg-slate-900/90 p-8 shadow-xl shadow-black/20"
        >
          <div className="space-y-4">
            <label className="block text-sm text-slate-300">
              Nom
              <Input
                required
                value={form.name}
                onChange={event => setForm(prev => ({ ...prev, name: event.target.value }))}
                placeholder="Votre nom"
              />
            </label>
            <label className="block text-sm text-slate-300">
              E-mail
              <Input
                required
                type="email"
                value={form.email}
                onChange={event => setForm(prev => ({ ...prev, email: event.target.value }))}
                placeholder="email@exemple.com"
              />
            </label>
            <label className="block text-sm text-slate-300">
              Message
              <textarea
                required
                value={form.message}
                onChange={event => setForm(prev => ({ ...prev, message: event.target.value }))}
                rows={6}
                className="w-full rounded-3xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
                placeholder="Décrivez votre projet immobilier..."
              />
            </label>
          </div>

          <Button type="submit">Envoyer le message</Button>

          {submitted && (
            <p className="rounded-3xl bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
              Merci, votre message a été pris en compte. Nous revenons vers vous très vite.
            </p>
          )}
        </form>

        <aside className="space-y-6 rounded-[32px] border border-slate-800 bg-slate-900/90 p-8 shadow-xl shadow-black/20">
          <div>
            <p className="text-sm uppercase tracking-[0.36em] text-amber-300">Informations</p>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              Bureau Parisien
              <br />
              contact@immo-luxe.fr
              <br />
              +33 1 23 45 67 89
            </p>
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.36em] text-amber-300">Localisation</p>
            <div className="mt-4 overflow-hidden rounded-3xl border border-slate-800 bg-slate-950">
              <iframe
                title="Carte Google Maps Immo_Luxe"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.99900461498!2d2.294481315674336!3d48.85837007928769!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fcbd1985551%3A0x6c3a4bfd0a9c6f4f!2sTour%20Eiffel!5e0!3m2!1sfr!2sfr!4v1700000000000!5m2!1sfr!2sfr"
                className="h-64 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
