export interface Product {
  id: string;
  name: string;
  subtitle?: string;
  category: string;
  price: number;
  stock: number;
  description: string;
  image: string;
  image2?: string;
  tags: string[];
  featured: boolean;
  material?: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 'th-hero-chronograph',
    name: 'The Hour Chronograph',
    subtitle: 'Signature Series — Black & Gold',
    category: 'Chronograph',
    price: 4999,
    stock: 5,
    description: 'The definitive expression of The Hour. A masterfully crafted chronograph featuring a deep matte black dial and 18k gold accents. Driven by a high-precision automatic movement with a 72-hour power reserve.',
    image: '/hero-watch.png',
    tags: ['Signature', 'Automatic'],
    featured: true,
    material: '18k Gold & DLC Steel'
  },
  {
    id: 'th-grant-watch',
    name: 'Grant Watch',
    subtitle: 'Minimalist Series — Silver & Black',
    category: 'Dress Watch',
    price: 1000,
    stock: 12,
    description: 'A study in minimalist luxury. The Grant Watch features a surgical-grade stainless steel case and a genuine black leather strap. Its clean, uncluttered dial is protected by scratch-resistant sapphire crystal.',
    image: '/grant-watch.png',
    tags: ['Minimalist', 'Classic'],
    featured: true,
    material: 'Stainless Steel'
  },
  {
    id: 'th-outdoor-sports',
    name: 'Outdoor Sports',
    subtitle: 'Performance Series — Titanium',
    category: 'Sport',
    price: 1550,
    stock: 8,
    description: 'Built for the relentless. The Outdoor Sports watch combines a rugged titanium case with an integrated silicone strap. Water resistant to 200m, it features a hybrid analog-digital display for ultimate utility.',
    image: '/outdoor-sports.png',
    tags: ['Rugged', 'Performance'],
    featured: true,
    material: 'Titanium'
  }
];

export const formatPrice = (price: number): string =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(price);
