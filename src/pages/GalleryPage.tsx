import { useCallback, useEffect, useMemo, useState } from 'react'
import { Lightbox } from '../components/Lightbox.tsx'
import { PageHero } from '../components/PageHero.tsx'
import { galleryGroups, galleryImages, type GalleryGroup } from '../data/gallery.ts'

export function GalleryPage() {
  const [group, setGroup] = useState<'All' | GalleryGroup>('All')
  const [active, setActive] = useState<number | null>(null)

  useEffect(() => {
    document.title = 'Gallery · EMBER'
  }, [])

  const images = useMemo(
    () => (group === 'All' ? galleryImages : galleryImages.filter((image) => image.group === group)),
    [group],
  )

  const close = useCallback(() => setActive(null), [])
  const change = useCallback((index: number) => setActive(index), [])

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Light, fire, and the table."
        text="A look at the dining room, the hearth, and a few plates from recent evenings."
        image="/images/night.jpg"
        alt="The restaurant in the evening"
      />

      <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-5 py-8 md:px-8">
        {galleryGroups.map((item) => {
          const selected = item === group
          return (
            <button
              key={item}
              type="button"
              aria-pressed={selected}
              className={`shrink-0 border px-4 py-2 text-[0.72rem] uppercase tracking-[0.18em] transition ${
                selected ? 'border-copper bg-copper text-ink' : 'border-beige/15 text-sand hover:border-copper hover:text-beige'
              }`}
              onClick={() => {
                setGroup(item)
                setActive(null)
              }}
            >
              {item}
            </button>
          )
        })}
      </div>

      <section className="mx-auto columns-1 gap-4 px-5 pb-24 sm:columns-2 lg:columns-3 md:px-8 max-w-6xl">
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            className="group mb-4 block w-full break-inside-avoid overflow-hidden text-left"
            onClick={() => setActive(index)}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full object-cover transition duration-700 group-hover:scale-[1.03]"
              loading="lazy"
            />
            <span className="mt-2 block text-sm text-mist transition group-hover:text-beige">{image.caption}</span>
          </button>
        ))}
      </section>

      {active !== null ? <Lightbox images={images} index={active} onClose={close} onChange={change} /> : null}
    </>
  )
}
