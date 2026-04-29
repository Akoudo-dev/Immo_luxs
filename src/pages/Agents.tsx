import { useEffect, useState } from 'react'
import { fetchAgents } from '../services/api'
import AgentCard from '../components/AgentCard'
import LoadingSpinner from '../components/LoadingSpinner'
import type { Agent } from '../types'

export default function Agents() {
  const [agents, setAgents] = useState<Agent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAgents().then(data => {
      setAgents(data)
      setLoading(false)
    })
  }, [])

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-[40px] bg-[radial-gradient(circle_at_top,_rgba(245,158,11,0.18),_transparent_45%),_linear-gradient(180deg,_rgba(15,23,42,0.96),_rgba(15,23,42,0.88))] p-8 sm:p-12 lg:p-16">
        <div className="relative rounded-[15px] bg-[url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1400&q=80')] bg-cover bg-center p-8 text-white">
          <div className="flex h-full min-h-[480px] flex-col justify-center   p-8">
            <p className="text-sm uppercase tracking-[0.36em] text-amber-300">Équipe</p>
            <h1 className="mt-3 text-4xl font-semibold text-white">Nos agents experts en immobilier de luxe</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-200">
              Une équipe dédiée au service des clients haut de gamme, avec réseau et expertise du marché local.
            </p>
          </div>
        </div>
      </section>

     {/*  <section className="rounded-[32px] border border-slate-800 bg-slate-900/90 p-8 shadow-xl shadow-black/20">
        <p className="text-sm uppercase tracking-[0.36em] text-amber-300">Équipe</p>
        <h1 className="mt-3 text-3xl font-semibold text-white">Nos agents experts</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400">
          Une équipe dédiée au service des clients haut de gamme, avec réseau et expertise du marché local.
        </p>
      </section> */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {agents.map(agent => (
          <AgentCard key={agent.id} agent={agent} />
        ))}
      </div>
    </div>
  )
}
