import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { navLinks, restaurant } from '../data/restaurant.ts'

function linkClass(isActive: boolean) {
  return `text-[0.72rem] uppercase tracking-[0.22em] transition hover:text-ember ${
    isActive ? 'text-ember' : 'text-beige/80'
  }`
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b transition duration-300 ${
        scrolled || open
          ? 'border-beige/10 bg-ink/95 backdrop-blur-md'
          : 'border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5 md:px-8">
        <NavLink to="/" className="font-serif text-2xl tracking-[0.32em] text-beige" end>
          EMBER
        </NavLink>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === '/'} className={({ isActive }) => linkClass(isActive)}>
              {link.label}
            </NavLink>
          ))}
          <a href={restaurant.phoneHref} className="text-[0.72rem] tracking-[0.14em] text-sand hover:text-ember">
            {restaurant.phone}
          </a>
          <NavLink
            to="/reserve"
            className="inline-flex min-h-11 items-center bg-copper px-5 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-ink transition hover:bg-ember"
          >
            Reserve
          </NavLink>
        </nav>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center border border-beige/20 text-beige lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          <span aria-hidden="true" className="flex w-5 flex-col gap-1.5">
            <span className={`h-px bg-beige transition ${open ? 'translate-y-[3.5px] rotate-45' : ''}`} />
            <span className={`h-px bg-beige transition ${open ? '-translate-y-[3.5px] -rotate-45' : ''}`} />
          </span>
        </button>
      </div>

      {open ? (
        <nav id="mobile-menu" className="border-t border-beige/10 bg-ink px-5 py-8 lg:hidden" aria-label="Mobile">
          <ul className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className="font-serif text-4xl text-beige"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
            <li>
              <NavLink to="/reserve" className="font-serif text-4xl text-copper" onClick={() => setOpen(false)}>
                Reserve
              </NavLink>
            </li>
            <li>
              <a href={restaurant.phoneHref} className="text-sand">
                {restaurant.phone}
              </a>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  )
}
