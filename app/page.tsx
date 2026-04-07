import CinematicHero from "@/components/CinematicHero";
import BentoCollection from "@/components/BentoCollection";

export default function Home() {
  return (
    <div className="bg-black">
      <CinematicHero />
      <BentoCollection />
      
      {/* Dynamic CTA Section */}
      <section className="relative w-full py-40 flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        
        <div className="relative z-10 text-center space-y-6 max-w-2xl px-6">
          <h2 className="text-white text-3xl md:text-5xl font-serif uppercase tracking-wider">
            Acquisition Awaits
          </h2>
          <p className="text-white/40 font-geometric text-xs uppercase tracking-[0.3em]">
            Step into the world of uncompromising excellence.
          </p>
          <div className="pt-10">
            <button className="bg-[#C8A97E] text-black px-12 py-5 text-[10px] font-bold uppercase tracking-[0.5em] hover:bg-white transition-all duration-500 hover:scale-110 active:scale-95">
              Enter the Boutique
            </button>
          </div>
        </div>

        {/* Muted background monogram */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] font-serif text-white/[0.01] pointer-events-none select-none">
          TH
        </div>
      </section>

      {/* Footer Branding */}
      <footer className="py-20 border-t border-white/5 flex flex-col items-center space-y-8">
        <img src="/logo.png" className="w-12 h-12 filter grayscale opacity-20" alt="TH Logo" />
        <div className="flex space-x-12">
           {['Archive', 'Atelier', 'Legal', 'Privacy'].map((item) => (
             <a key={item} href="#" className="text-[10px] text-white/20 uppercase tracking-[0.4em] hover:text-white transition-colors">
               {item}
             </a>
           ))}
        </div>
        <p className="text-[9px] text-white/10 uppercase tracking-widest font-geometric">
          © 2026 The Hour — All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}
