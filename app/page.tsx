import CinematicHero from "@/components/CinematicHero";
import BentoCollection from "@/components/BentoCollection";
import MagneticButton from "@/components/MagneticButton";
import Link from 'next/link';
import { supabase } from "@/lib/supabase";

export const revalidate = 3600; // Cache for 1 hour

async function getFeaturedWatches() {
  const { data, error } = await supabase
    .from('watches')
    .select('*')
    .eq('is_featured', true)
    .limit(3);
  
  if (error) {
    console.error('Error fetching featured watches:', error);
    return [];
  }
  return data;
}

export default async function Home() {
  const watches = await getFeaturedWatches();

  return (
    <div className="bg-black reveal-content">
      <CinematicHero />
      
      <div id="collection">
        <BentoCollection watches={watches} />
      </div>
      
      {/* Call to Action Section */}
      <section className="relative w-full py-60 flex flex-col items-center justify-center overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(200,169,126,0.05),_transparent_70%)]" />
        
        <div className="relative z-10 text-center space-y-8 max-w-2xl px-6">
          <div className="overflow-hidden">
            <h2 className="text-white text-4xl md:text-6xl font-serif uppercase tracking-tight">
              Explore Our Collection
            </h2>
          </div>
          
          <p className="text-[#C8A97E] font-sans text-xs uppercase tracking-[0.4em] font-medium">
            Find the perfect watch for your style.
          </p>
          
          <div className="pt-12 flex justify-center">
            <MagneticButton>
              <Link href="/shop" className="block outline-none">
                <button className="bg-white text-black px-16 py-6 text-[11px] font-bold uppercase tracking-[0.5em] transition-all hover:scale-105 active:scale-95 group relative overflow-hidden">
                  <span className="relative z-10">Visit Our Store</span>
                  <div className="absolute inset-0 bg-[#C8A97E] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                </button>
              </Link>
            </MagneticButton>
          </div>
        </div>

        {/* Muted background monogram */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] font-serif text-white/[0.02] pointer-events-none select-none">
          TH
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 border-t border-white/5 flex flex-col items-center space-y-10 bg-[#050505]">
        <Link href="/">
           <img src="/logo.png" className="w-14 h-14 filter grayscale brightness-200 opacity-30 cursor-pointer mix-blend-exclusion" alt="TH Logo" />
        </Link>
        
        <div className="flex flex-wrap justify-center gap-x-16 gap-y-6 px-6">
           {['Archive', 'About Us', 'Legal', 'Privacy'].map((item) => (
             <a key={item} href="#" className="text-[10px] text-white/30 uppercase tracking-[0.4em] hover:text-[#C8A97E] transition-colors font-medium">
               {item}
             </a>
           ))}
        </div>
        
        <div className="pt-10 flex flex-col items-center gap-4">
          <div className="w-12 h-[1px] bg-white/10" />
          <p className="text-[9px] text-white/15 uppercase tracking-widest font-sans font-medium">
            © 2026 The Hour — All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
