import { useEffect } from 'react'
import { PageHero } from '../components/PageHero.tsx'
import { ReservationForm } from '../components/ReservationForm.tsx'
import { restaurant } from '../data/restaurant.ts'

export function ReservePage() {
  useEffect(() => {
    document.title = 'Reserve · EMBER'
  }, [])

  return (
    <>
      <PageHero
        eyebrow="Reservations"
        title="Hold a table."
        text="Name, phone, date, time, and the size of your party. We save the request and keep the table under your name."
        image="/images/dining.jpg"
        alt="A dinner table at EMBER"
      />

      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-[minmax(0,1fr)_280px] md:px-8 md:py-20">
        <ReservationForm />
        <aside className="h-fit border border-beige/10 p-6">
          <p className="eyebrow">Before you book</p>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-sand">
            <li>Dinner only. The room is closed on Mondays.</li>
            <li>Last seating is thirty minutes before close.</li>
            <li>Parties of up to 12. Call for anything larger.</li>
            <li>Times are in Astana, Asia/Almaty.</li>
          </ul>
          <a href={restaurant.phoneHref} className="mt-6 block text-beige hover:text-ember">
            {restaurant.phone}
          </a>
          <a href={restaurant.emailHref} className="mt-2 block text-sm text-sand hover:text-ember">
            {restaurant.email}
          </a>
        </aside>
      </section>
    </>
  )
}
