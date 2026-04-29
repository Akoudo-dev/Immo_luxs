import { useState } from 'react'
import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'

const navItems = [
  { label: 'Accueil', path: '/' },
  { label: 'Biens', path: '/properties' },
  { label: 'Agents', path: '/agents' },
  { label: 'À propos', path: '/about' },
  { label: 'Contact', path: '/contact' }
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <motion.header
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="relative border-b border-slate-800 bg-slate-950/95 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-screen-2xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <NavLink to="/" className="text-2xl font-semibold tracking-tight text-white">
          Immo_Luxe
        </NavLink>

        <nav className="hidden gap-8 md:flex">
          {navItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `text-sm font-medium transition ${
                  isActive ? 'text-amber-300' : 'text-slate-300 hover:text-white'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <NavLink
            to="/contact"
            className="rounded-full border border-amber-500 px-4 py-2 text-sm font-semibold text-amber-300 transition hover:bg-amber-500/10"
          >
            Nous contacter
          </NavLink>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900/90 p-2 text-slate-300 hover:border-amber-500 hover:text-white md:hidden"
            onClick={() => setMenuOpen(prev => !prev)}
            aria-label="Ouvrir le menu"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950">
          <nav className="flex flex-col gap-1 px-4 py-4">
            {navItems.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 text-sm font-medium transition ${
                    isActive ? 'bg-amber-500 text-slate-950' : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </motion.header>
  )
}
