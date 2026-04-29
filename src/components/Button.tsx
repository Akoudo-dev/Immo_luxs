import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

interface BaseButtonProps {
  children: ReactNode
  variant?: 'primary' | 'ghost'
  className?: string
}

type ButtonAsButton = BaseButtonProps & ButtonHTMLAttributes<HTMLButtonElement> & { as?: 'button' }
type ButtonAsAnchor = BaseButtonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { as: 'a' }

type ButtonProps = ButtonAsButton | ButtonAsAnchor

export default function Button({ children, variant = 'primary', className = '', as = 'button', ...props }: ButtonProps) {
  const base =
    'inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-amber-400/60'

  const styles =
    variant === 'ghost'
      ? 'border border-slate-700 bg-slate-900/80 text-slate-100 hover:bg-slate-800'
      : 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 hover:bg-amber-400'

  const classNames = `${base} ${styles} ${className}`

  if (as === 'a') {
    return (
      <a className={classNames} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    )
  }

  return (
    <button className={classNames} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  )
}
