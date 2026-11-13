import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

type ButtonProps = {
  children: ReactNode
  to?: string
  href?: string
  type?: 'button' | 'submit'
  variant?: 'copper' | 'ghost'
  className?: string
  onClick?: () => void
  disabled?: boolean
}

const variants = {
  copper:
    'bg-copper text-ink hover:bg-ember disabled:cursor-not-allowed disabled:bg-copper/50',
  ghost:
    'border border-beige/30 bg-transparent text-beige hover:border-copper hover:text-ember',
}

export function Button({
  children,
  to,
  href,
  type = 'button',
  variant = 'copper',
  className = '',
  onClick,
  disabled,
}: ButtonProps) {
  const classNames = `inline-flex min-h-12 items-center justify-center px-6 text-[0.72rem] font-medium uppercase tracking-[0.22em] transition duration-300 ${variants[variant]} ${className}`

  if (to) {
    return (
      <Link to={to} className={classNames} onClick={onClick}>
        {children}
      </Link>
    )
  }

  if (href) {
    const external = href.startsWith('http')
    return (
      <a
        href={href}
        className={classNames}
        onClick={onClick}
        {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      >
        {children}
      </a>
    )
  }

  return (
    <button type={type} className={classNames} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}
