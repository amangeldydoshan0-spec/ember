import { Link } from 'react-router-dom'
import { navLinks, restaurant } from '../data/restaurant.ts'

export function Footer() {
  return (
    <footer className="border-t border-beige/10 bg-charcoal">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-4 md:px-8">
        <div className="md:col-span-2">
          <p className="font-serif text-3xl tracking-[0.28em]">EMBER</p>
          <p className="mt-4 max-w-sm text-sand">{restaurant.tagline}</p>
          <Link
            to="/reserve"
            className="mt-6 inline-flex min-h-11 items-center bg-copper px-5 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-ink transition hover:bg-ember"
          >
            Reserve a table
          </Link>
        </div>

        <div>
          <p className="eyebrow">Visit</p>
          <address className="mt-4 space-y-1 text-sm not-italic leading-relaxed text-sand">
            {restaurant.address.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
          <a href={restaurant.phoneHref} className="mt-4 block text-sm text-beige hover:text-ember">
            {restaurant.phone}
          </a>
          <a href={restaurant.emailHref} className="mt-1 block text-sm text-beige hover:text-ember">
            {restaurant.email}
          </a>
        </div>

        <div>
          <p className="eyebrow">Hours</p>
          <ul className="mt-4 space-y-2 text-sm text-sand">
            {restaurant.services.map((service) => (
              <li key={service.label} className="flex justify-between gap-4">
                <span>{service.label}</span>
                <span className="text-beige">{service.closed ? 'Closed' : `${service.open} – ${service.close}`}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-beige/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-6 text-xs text-mist md:flex-row md:items-center md:justify-between md:px-8">
          <p>© {new Date().getFullYear()} EMBER, Astana.</p>
          <nav className="flex flex-wrap gap-4" aria-label="Footer">
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to} className="hover:text-beige">
                {link.label}
              </Link>
            ))}
            <Link to="/reserve" className="hover:text-beige">
              Reserve
            </Link>
          </nav>
          <p>Photographs via Unsplash.</p>
        </div>
      </div>
    </footer>
  )
}
