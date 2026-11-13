export type GalleryGroup = 'Room' | 'Kitchen' | 'Plate'

export type GalleryImage = {
  src: string
  alt: string
  caption: string
  group: GalleryGroup
}

export const galleryGroups: Array<'All' | GalleryGroup> = ['All', 'Room', 'Kitchen', 'Plate']

export const galleryImages: GalleryImage[] = [
  {
    src: '/images/room.jpg',
    alt: 'The dining room with set tables and warm light',
    caption: 'The dining room, before service',
    group: 'Room',
  },
  {
    src: '/images/night.jpg',
    alt: 'Guests seated in a low-lit restaurant',
    caption: 'Evenings on Turan Avenue',
    group: 'Room',
  },
  {
    src: '/images/bar.jpg',
    alt: 'The bar with bottles and amber light',
    caption: 'The bar',
    group: 'Room',
  },
  {
    src: '/images/hero.jpg',
    alt: 'A corner of the restaurant in the evening',
    caption: 'Last light in the room',
    group: 'Room',
  },
  {
    src: '/images/kitchen.jpg',
    alt: 'Chefs working a busy kitchen pass',
    caption: 'The pass during service',
    group: 'Kitchen',
  },
  {
    src: '/images/chef.jpg',
    alt: 'A chef finishing a plate',
    caption: 'Finishing at the hearth',
    group: 'Kitchen',
  },
  {
    src: '/images/hearth.jpg',
    alt: 'Flames over a charcoal grill',
    caption: 'Wood and charcoal',
    group: 'Kitchen',
  },
  {
    src: '/images/grill.jpg',
    alt: 'Meat cooking on an open grill',
    caption: 'The grill, mid-service',
    group: 'Kitchen',
  },
  {
    src: '/images/dining.jpg',
    alt: 'Several plates arranged on a dark table',
    caption: 'A table in the middle of dinner',
    group: 'Plate',
  },
  {
    src: '/images/steak.jpg',
    alt: 'Sliced steak on a board',
    caption: 'Ribeye, rested',
    group: 'Plate',
  },
  {
    src: '/images/plating.jpg',
    alt: 'A composed plate with sauce',
    caption: 'A course leaving the pass',
    group: 'Plate',
  },
]
