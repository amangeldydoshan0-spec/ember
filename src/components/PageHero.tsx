type PageHeroProps = {
  eyebrow: string
  title: string
  text: string
  image: string
  alt: string
}

export function PageHero({ eyebrow, title, text, image, alt }: PageHeroProps) {
  return (
    <section className="relative flex min-h-[62vh] items-end overflow-hidden">
      <img src={image} alt={alt} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/35" />
      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-16 pt-36 md:px-8">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl font-serif text-5xl font-medium text-beige md:text-7xl">{title}</h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-sand md:text-lg">{text}</p>
      </div>
    </section>
  )
}
