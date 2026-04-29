import { motion } from 'framer-motion'
import type { Agent } from '../types'

interface AgentCardProps {
  agent: Agent
}

export default function AgentCard({ agent }: AgentCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.35 }}
      className="overflow-hidden rounded-[28px] border border-slate-800 bg-slate-900/90 p-6 shadow-xl shadow-black/20"
    >
      <div className="flex items-start gap-4">
        <img src={agent.photo} alt={agent.name} className="h-20 w-20 rounded-3xl object-cover" />
        <div>
          <p className="text-lg font-semibold text-white">{agent.name}</p>
          <p className="text-sm text-amber-300">{agent.title}</p>
        </div>
      </div>

      <p className="mt-5 text-sm leading-7 text-slate-400">{agent.description}</p>

      <div className="mt-5 space-y-2 text-sm text-slate-300">
        <p>
          <span className="font-semibold text-white">Téléphone:</span> {agent.phone}
        </p>
        <p>
          <span className="font-semibold text-white">Email:</span> {agent.email}
        </p>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {agent.specialties.map(tag => (
          <span key={tag} className="rounded-full bg-amber-500/10 px-3 py-1 text-xs text-amber-300">
            {tag}
          </span>
        ))}
      </div>
    </motion.article>
  )
}
