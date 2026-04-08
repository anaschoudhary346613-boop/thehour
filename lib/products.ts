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

// 1. AUTOMATICS (10)
const Automatics: Product[] = [
  {
    id: 'th-auto-01',
    name: 'Vault Master Auto',
    brand: 'The Hour',
    subtitle: 'Signature Series',
    category: 'Automatics',
    price: 8500,
    stock: 5,
    description: 'A pure expression of mechanical loyalty. 72-hour power reserve with a skeletonized case back.',
    image: '/watch-01.png',
    tags: ['Automatic', 'Skeleton'],
    featured: true,
    material: 'Grade 5 Titanium'
  },
  {
    id: 'th-auto-02',
    name: 'Geneva Reserve',
    brand: 'The Hour',
    subtitle: 'Elite Series',
    category: 'Automatics',
    price: 12000,
    stock: 3,
    description: 'Crafted in our Geneva laboratory, this timepiece features a unique perlaged baseplate.',
    image: '/watch-02.png',
    tags: ['Geneva', 'Precision'],
    featured: false,
    material: '18k White Gold'
  },
  { id: 'th-auto-03', name: 'Lunar Phase Auto', category: 'Automatics', price: 9200, stock: 4, description: 'Tracking the tides of time with astronomical precision.', image: '/watch-03.png', tags: ['Moonphase'], featured: false },
  { id: 'th-auto-04', name: 'Observatory Chronometre', category: 'Automatics', price: 15000, stock: 2, description: 'COSC certified movement with zero thermal expansion hairsprig.', image: '/watch-04.png', tags: ['Chronometer'], featured: true },
  { id: 'th-auto-05', name: 'Onyx Perpetual', category: 'Automatics', price: 18500, stock: 1, description: 'A perpetual calendar that won\'t need adjustment for 100 years.', image: '/watch-05.png', tags: ['Perpetual'], featured: false },
  { id: 'th-auto-06', name: 'Zenith Automatic', category: 'Automatics', price: 7800, stock: 6, description: 'High-frequency movement at 36,000 VpH.', image: '/watch-06.png', tags: ['High-Beat'], featured: false },
  { id: 'th-auto-07', name: 'Silver Ghost', category: 'Automatics', price: 6500, stock: 10, description: 'The quiet luxury of brushed silver and silent gears.', image: '/watch-01.png', tags: ['Minimalist'], featured: false },
  { id: 'th-auto-08', name: 'Titanium Flux', category: 'Automatics', price: 11000, stock: 5, description: 'Integrated bracelet design with seamless links.', image: '/watch-02.png', tags: ['Integrated'], featured: false },
  { id: 'th-auto-09', name: 'Midnight Rotor', category: 'Automatics', price: 8900, stock: 3, description: 'Black DLC coating with a glowing sapphire case back.', image: '/watch-03.png', tags: ['DLC'], featured: false },
  { id: 'th-auto-10', name: 'Heritage Self-Winding', category: 'Automatics', price: 5500, stock: 15, description: 'A tribute to the original 1920s automatic movements.', image: '/watch-04.png', tags: ['Vintage-Inspired'], featured: false },
];

// 2. CHRONOGRAPHS (10)
const Chronographs: Product[] = [
  {
    id: 'th-chrono-01',
    name: 'Velocity Prime',
    brand: 'The Hour',
    subtitle: 'Racing Series',
    category: 'Chronographs',
    price: 6800,
    stock: 8,
    description: 'Tachymeter scale designed for the highest precision on the track.',
    image: '/watch-05.png',
    tags: ['Racing', 'Tachymeter'],
    featured: true,
    material: 'Ceramic & Steel'
  },
  { id: 'th-chrono-02', name: 'Flyback Phantom', category: 'Chronographs', price: 8200, stock: 4, description: 'Instant reset flyback function for rapid timing.', image: '/watch-06.png', tags: ['Flyback'], featured: false },
  { id: 'th-chrono-03', name: 'Rattrapante X', category: 'Chronographs', price: 14000, stock: 2, description: 'Double chronograph for split-second measurement.', image: '/watch-01.png', tags: ['Split-Seconds'], featured: true },
  { id: 'th-chrono-04', name: 'Monopusher Gold', category: 'Chronographs', price: 9500, stock: 5, description: 'Single button control for start, stop, and reset.', image: '/watch-02.png', tags: ['Monopusher'], featured: false },
  { id: 'th-chrono-05', name: 'Panda Vault', category: 'Chronographs', price: 5800, stock: 12, description: 'The classic contrast of black and white sub-dials.', image: '/watch-03.png', tags: ['Vintage'], featured: false },
  { id: 'th-chrono-06', name: 'Aero Pilot Chrono', category: 'Chronographs', price: 7200, stock: 7, description: 'Slide-rule bezel for aviator calculations.', image: '/watch-04.png', tags: ['Pilot'], featured: false },
  { id: 'th-chrono-07', name: 'Blue Horizon', category: 'Chronographs', price: 6500, stock: 9, description: 'Sunray blue dial with triple sub-dial layout.', image: '/watch-05.png', tags: ['Sunray'], featured: false },
  { id: 'th-chrono-08', name: 'Steel Pulse', category: 'Chronographs', price: 4900, stock: 20, description: 'Everyday performance with stopwatch accuracy.', image: '/watch-06.png', tags: ['Entry-Luxury'], featured: false },
  { id: 'th-chrono-09', name: 'Golden Hour Chrono', category: 'Chronographs', price: 11000, stock: 3, description: 'Rose gold casing with deep chocolate dial.', image: '/watch-01.png', tags: ['Rose-Gold'], featured: false },
  { id: 'th-chrono-10', name: 'Deep Sea Chrono', category: 'Chronographs', price: 8800, stock: 6, description: 'Diver-rated chronograph with oversized pushers.', image: '/watch-02.png', tags: ['Diver'], featured: false },
];

// 3. HERITAGE (10)
const Heritage: Product[] = [
  { id: 'th-heritage-01', name: 'The 1954 Classic', category: 'Heritage', price: 12500, stock: 2, description: 'A faithful recreation of our first exhibition piece.', image: '/watch-03.png', tags: ['Archive'], featured: true },
  { id: 'th-heritage-02', name: 'Vanguard Spirit', category: 'Heritage', price: 9800, stock: 5, description: 'Military-spec designs from the mid-century.', image: '/watch-04.png', tags: ['Military'], featured: false },
  { id: 'th-heritage-03', name: 'Grand Archive', category: 'Heritage', price: 15000, stock: 1, description: 'Hand-restored vintage movement in a new case.', image: '/watch-05.png', tags: ['Restored'], featured: true },
  { id: 'th-heritage-04', name: 'Patina Gold', category: 'Heritage', price: 11200, stock: 3, description: 'Designed to age beautifully alongside the owner.', image: '/watch-06.png', tags: ['Aging'], featured: false },
  { id: 'th-heritage-05', name: 'Officer\'s Watch', category: 'Heritage', price: 7500, stock: 8, description: 'Field watch aesthetics with luxury finishing.', image: '/watch-01.png', tags: ['Field'], featured: false },
  { id: 'th-heritage-06', name: 'Breguet Spiral', category: 'Heritage', price: 18000, stock: 2, description: 'Featuring the legendary overcoil for superior timing.', image: '/watch-02.png', tags: ['Classic-Horology'], featured: false },
  { id: 'th-heritage-07', name: 'Silver Lining', category: 'Heritage', price: 6200, stock: 12, description: 'A tribute to the silver age of watchmaking.', image: '/watch-03.png', tags: ['Silver'], featured: false },
  { id: 'th-heritage-08', name: 'Pocket Transition', category: 'Heritage', price: 8900, stock: 4, description: 'Evolved from the earliest trench watches.', image: '/watch-04.png', tags: ['Historical'], featured: false },
  { id: 'th-heritage-09', name: 'Master Engraved', category: 'Heritage', price: 25000, stock: 1, description: 'Fully hand-engraved case and movement.', image: '/watch-05.png', tags: ['Art'], featured: true },
  { id: 'th-heritage-10', name: 'Legacy Diver', category: 'Heritage', price: 9500, stock: 5, description: 'The blueprint for our modern diving collection.', image: '/watch-06.png', tags: ['Icon'], featured: false },
];

// 4. DRESS (10)
const Dress: Product[] = [
  { id: 'th-dress-01', name: 'Slate Minimalist', category: 'Dress', price: 4500, stock: 15, description: 'Ultra-thin profile for the modern diplomat.', image: '/watch-01.png', tags: ['Slim'], featured: true },
  { id: 'th-dress-02', name: 'Royal Velvet', category: 'Dress', price: 6800, stock: 8, description: 'Deep purple dial with diamond-cut hands.', image: '/watch-02.png', tags: ['Evening'], featured: false },
  { id: 'th-dress-03', name: 'Grand Gala', category: 'Dress', price: 12000, stock: 3, description: 'Platinum case with numerical Roman indices.', image: '/watch-03.png', tags: ['Platinum'], featured: true },
  { id: 'th-dress-04', name: 'Midnight Tuxedo', category: 'Dress', price: 5900, stock: 10, description: 'The perfect companion for formal occasions.', image: '/watch-04.png', tags: ['Formal'], featured: false },
  { id: 'th-dress-05', name: 'Rose Petal', category: 'Dress', price: 7200, stock: 6, description: 'Soft pink gold and a textured cream dial.', image: '/watch-05.png', tags: ['Elegant'], featured: false },
  { id: 'th-dress-06', name: 'Pearl Essence', category: 'Dress', price: 8500, stock: 4, description: 'Mother of pearl dial with subtle iridescence.', image: '/watch-06.png', tags: ['Luxury'], featured: false },
  { id: 'th-dress-07', name: 'Classic Gold', category: 'Dress', price: 5500, stock: 12, description: 'The foundational dress watch.', image: '/watch-01.png', tags: ['Classic'], featured: false },
  { id: 'th-dress-08', name: 'Linear Design', category: 'Dress', price: 4800, stock: 9, description: 'Focusing on the beauty of the straight line.', image: '/watch-02.png', tags: ['Modern'], featured: false },
  { id: 'th-dress-09', name: 'Sovereign Dial', category: 'Dress', price: 11000, stock: 5, description: 'Commissioned for excellence and poise.', image: '/watch-03.png', tags: ['Elite'], featured: false },
  { id: 'th-dress-10', name: 'Amber Glow', category: 'Dress', price: 6200, stock: 7, description: 'Warm amber tones and a honey leather strap.', image: '/watch-04.png', tags: ['Warm'], featured: false },
];

// 5. SPORTS (10)
const Sports: Product[] = [
  { id: 'th-sport-01', name: 'Titanium Diver 500', category: 'Sports', price: 5500, stock: 20, description: '500m water resistance with helium escape valve.', image: '/watch-05.png', tags: ['Diving'], featured: true },
  { id: 'th-sport-02', name: 'Carbon Racer', category: 'Sports', price: 8900, stock: 10, description: 'Forged carbon fiber case for extreme lightness.', image: '/watch-06.png', tags: ['Carbon'], featured: true },
  { id: 'th-sport-03', name: 'Summit GMT', category: 'Sports', price: 7200, stock: 12, description: 'Track dual time zones on your next expedition.', image: '/watch-01.png', tags: ['GMT'], featured: false },
  { id: 'th-sport-04', name: 'Desert Storm', category: 'Sports', price: 4800, stock: 25, description: 'Sand-blasted steel and tactical nylon strap.', image: '/watch-02.png', tags: ['Tactical'], featured: false },
  { id: 'th-sport-05', name: 'Deep Ocean Blue', category: 'Sports', price: 6300, stock: 15, description: 'Ceramic bezel with liquid-metal markers.', image: '/watch-03.png', tags: ['Ceramic'], featured: false },
  { id: 'th-sport-06', name: 'Iron Endurance', category: 'Sports', price: 3900, stock: 30, description: 'Shock-proof and magnetic-resistant casing.', image: '/watch-04.png', tags: ['Rugged'], featured: false },
  { id: 'th-sport-07', name: 'Velocity Chrono S', category: 'Sports', price: 7800, stock: 8, description: 'High-speed sports chronograph.', image: '/watch-05.png', tags: ['Sport-Chrono'], featured: false },
  { id: 'th-sport-08', name: 'Alpine Explorer', category: 'Sports', price: 5200, stock: 18, description: 'Compass bezel for mountain navigation.', image: '/watch-06.png', tags: ['Adventure'], featured: false },
  { id: 'th-sport-09', name: 'Regatta Master', category: 'Sports', price: 9500, stock: 4, description: 'Countdown timer for professional yacht racing.', image: '/watch-01.png', tags: ['Yachting'], featured: false },
  { id: 'th-sport-10', name: 'Vortex Titanium', category: 'Sports', price: 11500, stock: 5, description: 'The absolute pinnacle of our sports line.', image: '/watch-02.png', tags: ['Elite-Sport'], featured: false },
];

export const PRODUCTS: Product[] = [
  ...Automatics,
  ...Chronographs,
  ...Heritage,
  ...Dress,
  ...Sports
];

export const formatPrice = (price: number): string =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
