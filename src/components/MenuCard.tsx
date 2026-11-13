import { Link } from 'react-router-dom'
import type { MenuItem } from '../data/menu.ts'
import { formatKzt } from '../lib/format.ts'

export function MenuCard({ item }: { item: MenuItem }) {
  return (
    <article className="group flex h-full flex-col border border-beige/10 bg-charcoal">
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={item.image}
          alt={item.alt}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-serif text-2xl text-beige">{item.name}</h3>
          <p className="shrink-0 text-sm text-copper">{formatKzt(item.price)}</p>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-mist">{item.description}</p>
      </div>
    </article>
  )
}

export function MenuCardLink({ item }: { item: MenuItem }) {
  return (
    <Link to={`/menu?category=${item.category}`} className="block h-full">
      <MenuCard item={item} />
    </Link>
  )
}
