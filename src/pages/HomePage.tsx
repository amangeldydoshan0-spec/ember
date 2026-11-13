import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../components/Button.tsx'
import { MenuCardLink } from '../components/MenuCard.tsx'
import { Reveal } from '../components/Reveal.tsx'
import { SectionHeading } from '../components/SectionHeading.tsx'
import { galleryImages } from '../data/gallery.ts'
import { menuItems, signatureIds } from '../data/menu.ts'
import { restaurant } from '../data/restaurant.ts'

const signatures = signatureIds
  .map((id) => menuItems.find((item) => item.id === id))
  .filter((item) => item !== undefined)

export function HomePage() {
  useEffect(() => {
    document.title = 'EMBER · Astana'
  }, [])

  return (
    <>
      <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
        <img
          src="/images/hero.jpg"
          alt="The EMBER dining room in the evening"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/75 via-ink/55 to-ink" />
        <div className="relative z-10 px-5 text-center">
          <p className="eyebrow">Astana</p>
          <h1 className="mt-4 font-serif text-[clamp(4.5rem,12vw,8.75rem)] font-medium leading-none tracking-[0.08em] text-beige">
            EMBER
          </h1>
          <p className="mx-auto mt-6 max-w-md text-lg leading-relaxed text-sand">{restaurant.tagline} A short menu, and a long evening.</p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button to="/reserve">Reserve a table</Button>
            <Button to="/menu" variant="ghost">
              View the menu
            </Button>
          </div>
        </div>
        <a
          href="#story"
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-[0.68rem] uppercase tracking-[0.28em] text-sand hover:text-ember"
        >
          Enter
        </a>
      </section>

      <section id="story" className="mx-auto grid max-w-6xl scroll-mt-24 items-center gap-10 px-5 py-24 md:grid-cols-12 md:px-8 md:py-32">
        <Reveal className="md:col-span-7">
          <div className="overflow-hidden">
            <img
              src="/images/dining.jpg"
              alt="Plates set along a dark dining table"
              className="aspect-[4/5] w-full object-cover md:aspect-[5/4]"
            />
          </div>
        </Reveal>
        <Reveal className="md:col-span-5" delay={0.1}>
          <p className="eyebrow">The house</p>
          <h2 className="mt-3 font-serif text-4xl font-medium leading-tight text-beige md:text-5xl">
            Dinner cooked on wood and charcoal.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-sand">
            EMBER is a dinner-only dining room in Esil. The kitchen works over an open hearth: lamb from the steppe,
            river fish, honey, and a few vegetables that can take the heat. The menu stays short so the fire can be
            watched.
          </p>
          <p className="mt-4 text-base leading-relaxed text-sand">
            Come for the evening. We close on Mondays, and we do not serve lunch.
          </p>
          <div className="mt-8">
            <Button to="/about" variant="ghost">
              About the restaurant
            </Button>
          </div>
        </Reveal>
      </section>

      <section className="bg-charcoal py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Signatures"
              title="Three plates we keep on the fire."
              text="The rest of the menu changes with the week. These three stay."
            />
            <Button to="/menu" variant="ghost">
              Full menu
            </Button>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {signatures.map((item) => (
              <Reveal key={item.id}>
                <MenuCardLink item={item} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-24 md:grid-cols-2 md:px-8">
        <Reveal>
          <p className="eyebrow">Hours</p>
          <h2 className="mt-3 font-serif text-4xl text-beige">Evenings only.</h2>
          <ul className="mt-8 divide-y divide-beige/10 border-y border-beige/10">
            {restaurant.services.map((service) => (
              <li key={service.label} className="flex items-center justify-between gap-4 py-4 text-sm">
                <span className="text-sand">{service.label}</span>
                <span className="text-beige">{service.closed ? 'Closed' : `${service.open} – ${service.close}`}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-mist">Last seating is thirty minutes before close.</p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="relative min-h-80 overflow-hidden">
            <img src="/images/hearth.jpg" alt="Flames over the charcoal hearth" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-ink/35" />
            <blockquote className="absolute inset-x-0 bottom-0 p-8">
              <p className="font-serif text-3xl leading-snug text-beige">
                “We cook close to the coals, and we stop when the fire says so.”
              </p>
            </blockquote>
          </div>
        </Reveal>
      </section>

      <section className="bg-stone py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Gallery" title="The room, the hearth, the plate." />
            <Button to="/gallery" variant="ghost">
              Open the gallery
            </Button>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
            {galleryImages.slice(0, 4).map((image) => (
              <Link key={image.src} to="/gallery" className="group block overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="aspect-square w-full object-cover transition duration-700 group-hover:scale-105"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-28">
        <img src="/images/dining.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-ink/75" />
        <div className="relative z-10 mx-auto max-w-3xl px-5 text-center">
          <p className="eyebrow">Reservations</p>
          <h2 className="mt-3 font-serif text-4xl text-beige md:text-6xl">Set a table for the evening.</h2>
          <p className="mx-auto mt-5 max-w-lg text-sand">
            Tell us your name, a phone number, and when you would like to sit. We keep parties to twelve at a table.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button to="/reserve">Reserve a table</Button>
            <Button to="/contact" variant="ghost">
              Find us
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
