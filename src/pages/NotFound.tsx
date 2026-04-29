import { Link } from 'react-router-dom'
import Button from '../components/Button'

export default function NotFound() {
  return (
    <div className="rounded-[32px] border border-slate-800 bg-slate-900/90 p-12 text-center shadow-xl shadow-black/20">
      <p className="text-sm uppercase tracking-[0.36em] text-amber-300">Erreur 404</p>
      <h1 className="mt-4 text-4xl font-semibold text-white">Page introuvable</h1>
      <p className="mt-4 max-w-xl mx-auto text-sm leading-7 text-slate-400">
        La page que vous recherchez n’existe pas ou a été déplacée. Retournez à l’accueil pour continuer votre visite.
      </p>
      <Link to="/">
        <Button className="mt-8">Retour à l’accueil</Button>
      </Link>
    </div>
  )
}
