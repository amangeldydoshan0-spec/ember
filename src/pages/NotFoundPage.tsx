import { useEffect } from 'react'
import { Button } from '../components/Button.tsx'

export function NotFoundPage() {
  useEffect(() => {
    document.title = 'Page not found · EMBER'
  }, [])

  return (
    <section className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-start justify-center px-5 pt-28 md:px-8">
      <p className="eyebrow">404</p>
      <h1 className="mt-3 font-serif text-5xl text-beige md:text-6xl">This page has gone out.</h1>
      <p className="mt-4 max-w-md text-sand">The address does not match a room in the house. The menu and the dining room are still open.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button to="/">Back home</Button>
        <Button to="/reserve" variant="ghost">
          Reserve a table
        </Button>
      </div>
    </section>
  )
}
