type SectionHeadingProps = {
  eyebrow: string
  title: string
  text?: string
}

export function SectionHeading({ eyebrow, title, text }: SectionHeadingProps) {
  return (
    <div className="max-w-2xl">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 font-serif text-4xl font-medium text-beige md:text-5xl">{title}</h2>
      {text ? <p className="mt-4 text-base leading-relaxed text-sand">{text}</p> : null}
    </div>
  )
}
