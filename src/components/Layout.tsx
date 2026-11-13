import { motion, useReducedMotion } from 'framer-motion'
import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Footer } from './Footer.tsx'
import { Navbar } from './Navbar.tsx'

export function Layout() {
  const location = useLocation()
  const reduce = useReducedMotion()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="min-h-svh bg-ink text-beige">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-copper focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <Navbar />
      <motion.main
        id="content"
        key={location.pathname}
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduce ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <Outlet />
      </motion.main>
      <Footer />
    </div>
  )
}
