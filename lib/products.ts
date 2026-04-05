import { Product } from '@/store/cartStore';

export const PRODUCTS: Product[] = [
  {
    id: 'tw-001',
    name: 'Noctua Royal',
    subtitle: 'Chronograph — Rose Gold',
    category: 'Chronograph',
    price: 28500,
    stock: 7,
    description:
      'The Noctua Royal is a testament to the art of haute horlogerie. Its midnight blue dial, hand-guilloché on a rose engine, captures the depth of the cosmos. The in-house automatic movement beats at 4Hz, offering 72 hours of power reserve.',
    image: '/watch-01.png',
    image2: '/watch-02.png',
    tags: ['Limited Edition', 'In-House Movement'],
    featured: true,
  },
  {
    id: 'tw-002',
    name: 'Lumière Squelette',
    subtitle: 'Flying Skeleton — Silver',
    category: 'Dress Watch',
    price: 42000,
    stock: 3,
    description:
      'Every gear, every bridge, a work of sculptural art. The Lumière Squelette reveals the soul of its movement through an open-worked dial. Hand-engraved rhodium-plated bridges catch the light with every subtle movement of the wrist.',
    image: '/watch-02.png',
    image2: '/watch-03.png',
    tags: ['Skeleton Dial', 'Hand-Engraved'],
    featured: true,
  },
  {
    id: 'tw-003',
    name: 'Apex Noir',
    subtitle: 'Sport Chronograph — DLC Titanium',
    category: 'Sport',
    price: 19800,
    stock: 12,
    description:
      'Born on the track, refined for the streets. The Apex Noir houses a COSC-certified movement inside a featherlight DLC-coated titanium case. Carbon fiber dial, 100m water resistance, and orange-tipped hands that command attention.',
    image: '/watch-03.png',
    image2: '/watch-01.png',
    tags: ['COSC Certified', 'Titanium'],
    featured: true,
  },
  {
    id: 'tw-004',
    name: 'Grand Complication I',
    subtitle: 'Perpetual Calendar — Yellow Gold',
    category: 'Complication',
    price: 118000,
    stock: 2,
    description:
      'The pinnacle of timekeeping mastery. This grand complication features a perpetual calendar, minute repeater, and moon phase display — all housed within a hand-finished 18k yellow gold case. Only 10 pieces ever produced.',
    image: '/watch-04.png',
    image2: '/watch-05.png',
    tags: ['Only 10 Pieces', 'Perpetual Calendar'],
    featured: false,
  },
  {
    id: 'tw-005',
    name: 'Abyssal Vert',
    subtitle: 'Professional Diver — Stainless Steel',
    category: 'Diver',
    price: 15200,
    stock: 18,
    description:
      'Engineered for the deep and sculpted for the surface. The Abyssal Vert offers 300m water resistance alongside a radiant forest-green dial that shifts majestically from deep emerald to brilliant teal under changing light.',
    image: '/watch-05.png',
    image2: '/watch-06.png',
    tags: ['300M Water Resistant', 'Luminous Markers'],
    featured: false,
  },
  {
    id: 'tw-006',
    name: 'Éternel Tourbillon',
    subtitle: 'Flying Tourbillon — Platinum',
    category: 'Tourbillon',
    price: 225000,
    stock: 1,
    description:
      'The Éternel Tourbillon represents the ultimate expression of The Hour\'s mastery. A flying tourbillon cage rotates once per minute in a platinum case of ethereal elegance. Each watch requires over 1,200 hours of hand-finishing. Enquire for private appointment.',
    image: '/watch-06.png',
    image2: '/watch-04.png',
    tags: ['Flying Tourbillon', 'Platinum'],
    featured: true,
  },
];

export const formatPrice = (price: number): string =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(price);
