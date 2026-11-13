import { useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { MenuCard } from '../components/MenuCard.tsx'
import { PageHero } from '../components/PageHero.tsx'
import { menuCategories, menuItems, type MenuCategoryId } from '../data/menu.ts'

const categoryIds = new Set(menuCategories.map((category) => category.id))

export function MenuPage() {
  const [params, setParams] = useSearchParams()
  const requested = params.get('category')
  const active: MenuCategoryId = requested && categoryIds.has(requested as MenuCategoryId)
    ? (requested as MenuCategoryId)
    : 'starters'

  useEffect(() => {
    document.title = 'Menu · EMBER'
  }, [])

  const category = menuCategories.find((item) => item.id === active) ?? menuCategories[0]
  const items = useMemo(() => menuItems.filter((item) => item.category === active), [active])

  return (
    <>
      <PageHero
        eyebrow="Menu"
        title="A short list, priced in tenge."
        text="Dishes leave the hearth in the order the fire allows. Prices are in Kazakhstani tenge."
        image="/images/dining.jpg"
        alt="A table of plates at EMBER"
      />

      <div className="sticky top-20 z-30 border-b border-beige/10 bg-ink/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-5 py-4 md:px-8">
          {menuCategories.map((item) => {
            const selected = item.id === active
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={selected}
                className={`shrink-0 border px-4 py-2 text-[0.72rem] uppercase tracking-[0.18em] transition ${
                  selected
                    ? 'border-copper bg-copper text-ink'
                    : 'border-beige/15 text-sand hover:border-copper hover:text-beige'
                }`}
                onClick={() => setParams({ category: item.id })}
              >
                {item.label}
              </button>
            )
          })}
        </div>
      </div>

      <section className="mx-auto max-w-6xl px-5 py-16 md:px-8">
        <p className="text-sand">{category.note}</p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </>
  )
}
