import { useEffect } from 'react'
import { Button } from '../components/Button.tsx'
import { PageHero } from '../components/PageHero.tsx'
import { mapEmbedUrl, mapLink, restaurant, twoGisLink } from '../data/restaurant.ts'

export function ContactPage() {
  useEffect(() => {
    document.title = 'Contact · EMBER'
  }, [])

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Turan Avenue, Astana."
        text="Dinner service in the Esil district. Call, write, or reserve a table online."
        image="/images/bar.jpg"
        alt="The bar at EMBER"
      />

      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:grid-cols-2 md:px-8">
        <div>
          <p className="eyebrow">The dining room</p>
          <address className="mt-4 space-y-1 text-lg not-italic leading-relaxed text-beige">
            {restaurant.address.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>

          <div className="mt-8 space-y-3">
            <a href={restaurant.phoneHref} className="block text-beige hover:text-ember">
              {restaurant.phone}
            </a>
            <a href={restaurant.emailHref} className="block text-beige hover:text-ember">
              {restaurant.email}
            </a>
          </div>

          <ul className="mt-10 divide-y divide-beige/10 border-y border-beige/10">
            {restaurant.services.map((service) => (
              <li key={service.label} className="flex justify-between gap-4 py-3 text-sm">
                <span className="text-sand">{service.label}</span>
                <span>{service.closed ? 'Closed' : `${service.open} – ${service.close}`}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button to="/reserve">Reserve a table</Button>
            <Button href={mapLink} variant="ghost">
              Open the map
            </Button>
            <Button href={twoGisLink} variant="ghost">
              Open in 2GIS
            </Button>
          </div>
        </div>

        <div className="min-h-[420px] border border-beige/10">
          <iframe
            title="Map showing EMBER on Turan Avenue in Astana"
            src={mapEmbedUrl}
            className="h-full min-h-[420px] w-full"
            loading="lazy"
          />
        </div>
      </section>
    </>
  )
}
