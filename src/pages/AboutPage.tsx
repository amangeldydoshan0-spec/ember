import { useEffect } from 'react'
import { Button } from '../components/Button.tsx'
import { PageHero } from '../components/PageHero.tsx'
import { Reveal } from '../components/Reveal.tsx'

const principles = [
  {
    title: 'The hearth',
    text: 'Wood and charcoal do the cooking. There is no gas line on the grill, and the menu is sized to what one fire can finish in an evening.',
  },
  {
    title: 'The steppe',
    text: 'Lamb, honey, dairy, and grain come from Kazakh producers when the week allows. Fish arrives from the river and from the Altai.',
  },
  {
    title: 'The room',
    text: 'Low light, linen, and enough quiet to hear the table beside you. Dinner is the only service, and Mondays are dark.',
  },
]

export function AboutPage() {
  useEffect(() => {
    document.title = 'About · EMBER'
  }, [])

  return (
    <>
      <PageHero
        eyebrow="About"
        title="A dining room built around a fire."
        text="EMBER sits on Turan Avenue, in the Esil district of Astana. We open for dinner, and we keep the room small on purpose."
        image="/images/room.jpg"
        alt="The EMBER dining room"
      />

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-24 md:grid-cols-2 md:px-8">
        <Reveal>
          <p className="eyebrow">The kitchen</p>
          <h2 className="mt-3 font-serif text-4xl text-beige md:text-5xl">Everything that can meet the coals, does.</h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-sand">
            <p>
              The restaurant was planned as a single hearth and a short list. Steaks rest beside the grill. Vegetables
              are cooked whole. Sauces are made from the bones of the same service, not from a stockpot left for days.
            </p>
            <p>
              The team plates in the open, a few steps from the tables. If the fire is running late, the room waits. We
              would rather serve a dish when it is ready than rush it to keep a clock.
            </p>
            <p>
              Reservations are how we set the evening. Walk-ins are welcome when a table is free, and parties larger
              than twelve should call so we can lay two tables together.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <img src="/images/chef.jpg" alt="A chef finishing a plate beside the pass" className="aspect-[4/5] w-full object-cover" />
        </Reveal>
      </section>

      <section className="bg-charcoal py-24">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 md:grid-cols-3 md:px-8">
          {principles.map((principle) => (
            <Reveal key={principle.title}>
              <article className="h-full border border-beige/10 p-8">
                <h3 className="font-serif text-3xl text-beige">{principle.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-sand">{principle.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-5 py-24 md:flex-row md:items-end md:justify-between md:px-8">
        <div>
          <p className="eyebrow">Visit</p>
          <h2 className="mt-3 font-serif text-4xl text-beige">Come for dinner.</h2>
          <p className="mt-4 max-w-lg text-sand">16 Turan Avenue. The door opens at the hour printed on the contact page.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button to="/reserve">Reserve a table</Button>
          <Button to="/contact" variant="ghost">
            Contact
          </Button>
        </div>
      </section>
    </>
  )
}
