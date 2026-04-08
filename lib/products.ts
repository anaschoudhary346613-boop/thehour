export interface Product {
  id: string;
  name: string;
  subtitle?: string;
  brand?: string;
  category: string;
  price: number;
  originalPrice?: number;
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
    brand: 'The Hour',
    subtitle: 'Signature Series — Black & Gold',
    category: 'Chronograph',
    price: 4999,
    originalPrice: 5999,
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
    brand: 'The Hour',
    subtitle: 'Minimalist Series — Silver & Black',
    category: 'Dress Watch',
    price: 1000,
    originalPrice: 1250,
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
    brand: 'The Hour',
    subtitle: 'Performance Series — Titanium',
    category: 'Sport',
    price: 1550,
    originalPrice: 1800,
    stock: 8,
    description: 'Built for the relentless. The Outdoor Sports watch combines a rugged titanium case with an integrated silicone strap. Water resistant to 200m, it features a hybrid analog-digital display for ultimate utility.',
    image: '/outdoor-sports.png',
    tags: ['Rugged', 'Performance'],
    featured: true,
    material: 'Titanium'
  },
  {
    id: 'ap-royal-oak',
    name: 'Audemars Piguet',
    brand: 'Audemars Piguet',
    subtitle: 'Royal Oak Offshore',
    category: 'Luxury',
    price: 1450,
    originalPrice: 1600,
    stock: 3,
    description: 'The legendary Royal Oak Offshore. A cult classic redefined for the modern age with unprecedented material science and movement precision.',
    image: '/hero-watch.png',
    tags: ['Iconic', 'Elite'],
    featured: false,
    material: 'Forged Carbon'
  }
];

export const formatPrice = (price: number): string =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
