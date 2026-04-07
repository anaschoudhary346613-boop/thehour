import CinematicHero from "@/components/CinematicHero";
import BentoCollection from "@/components/BentoCollection";
import MagneticButton from "@/components/MagneticButton";

export default function Home() {
  return (
    <div className="bg-black">
      <CinematicHero />
      
      <div id="collection">
        <BentoCollection />
      </div>
      
      {/* Dynamic CTA Section */}
      <section className="relative w-full py-60 flex flex-col items-center justify-center overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(200,169,126,0.05),_transparent_70%)]" />
        
        <div className="relative z-10 text-center space-y-8 max-w-2xl px-6">
          <div className="overflow-hidden">
            <h2 className="text-white text-4xl md:text-6xl font-serif uppercase tracking-tight">
              Acquisition Awaits
            </h2>
          </div>
          
          <p className="text-[#C8A97E] font-sans text-xs uppercase tracking-[0.4em] font-medium">
            Step into the world of uncompromising excellence.
          </p>
          
          <div className="pt-12 flex justify-center">
            <MagneticButton>
              <button className="bg-white text-black px-16 py-6 text-[11px] font-bold uppercase tracking-[0.5em] transition-all hover:scale-105 active:scale-95 group relative overflow-hidden">
                <span className="relative z-10">Enter the Boutique</span>
                <div className="absolute inset-0 bg-[#C8A97E] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </button>
            </MagneticButton>
          </div>
        </div>

        {/* Muted background monogram */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] font-serif text-white/[0.02] pointer-events-none select-none">
          TH
        </div>
      </section>

      {/* Footer Branding */}
      <footer className="py-24 border-t border-white/5 flex flex-col items-center space-y-10 bg-[#050505]">
        <img src="/logo.png" className="w-14 h-14 filter grayscale brightness-200 opacity-30" alt="TH Logo" />
        
        <div className="flex flex-wrap justify-center gap-x-16 gap-y-6 px-6">
           {['Archive', 'Atelier', 'Legal', 'Privacy'].map((item) => (
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
