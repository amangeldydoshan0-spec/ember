export type ServiceWindow = {
  label: string
  days: number[]
  closed?: boolean
  open?: string
  close?: string
}

export const restaurant = {
  name: 'EMBER',
  city: 'Astana',
  tagline: 'Fire-led dining on Turan Avenue.',
  phone: '+7 7172 48 20 16',
  phoneHref: 'tel:+77172482016',
  email: 'reservations@ember-astana.kz',
  emailHref: 'mailto:reservations@ember-astana.kz',
  address: ['16 Turan Avenue', 'Esil District', 'Astana 010000, Kazakhstan'],
  map: {
    lat: 51.1198,
    lng: 71.3965,
  },
  services: [
    { label: 'Monday', days: [1], closed: true },
    { label: 'Tuesday – Thursday', days: [2, 3, 4], open: '18:00', close: '23:00' },
    { label: 'Friday – Saturday', days: [5, 6], open: '18:00', close: '00:00' },
    { label: 'Sunday', days: [0], open: '17:00', close: '22:00' },
  ] satisfies ServiceWindow[],
}

export const mapEmbedUrl =
  'https://www.openstreetmap.org/export/embed.html?bbox=71.380%2C51.110%2C71.413%2C51.130&layer=mapnik&marker=51.1198%2C71.3965'

export const mapLink =
  'https://www.openstreetmap.org/?mlat=51.1198&mlon=71.3965#map=16/51.1198/71.3965'

export const twoGisLink = 'https://2gis.kz/astana/search/Turan%20avenue'

export const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/about', label: 'About' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
]
