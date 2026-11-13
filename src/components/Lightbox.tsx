import { useEffect, useRef } from 'react'
import type { GalleryImage } from '../data/gallery.ts'

type LightboxProps = {
  images: GalleryImage[]
  index: number
  onClose: () => void
  onChange: (index: number) => void
}

export function Lightbox({ images, index, onClose, onChange }: LightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const image = images[index]

  useEffect(() => {
    closeRef.current?.focus()
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight') onChange((index + 1) % images.length)
      if (event.key === 'ArrowLeft') onChange((index - 1 + images.length) % images.length)
    }

    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [images.length, index, onChange, onClose])

  if (!image) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/92 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={image.caption}
      onClick={onClose}
    >
      <button
        ref={closeRef}
        type="button"
        className="absolute right-4 top-4 min-h-11 px-4 text-[0.72rem] uppercase tracking-[0.22em] text-beige"
        onClick={onClose}
      >
        Close
      </button>
      <button
        type="button"
        className="absolute left-3 top-1/2 min-h-11 -translate-y-1/2 px-3 text-2xl text-beige md:left-8"
        aria-label="Previous photograph"
        onClick={(event) => {
          event.stopPropagation()
          onChange((index - 1 + images.length) % images.length)
        }}
      >
        ‹
      </button>
      <figure className="max-w-5xl" onClick={(event) => event.stopPropagation()}>
        <img src={image.src} alt={image.alt} className="max-h-[78vh] w-full object-contain" />
        <figcaption className="mt-4 text-center text-sm text-sand">{image.caption}</figcaption>
      </figure>
      <button
        type="button"
        className="absolute right-3 top-1/2 min-h-11 -translate-y-1/2 px-3 text-2xl text-beige md:right-8"
        aria-label="Next photograph"
        onClick={(event) => {
          event.stopPropagation()
          onChange((index + 1) % images.length)
        }}
      >
        ›
      </button>
    </div>
  )
}
