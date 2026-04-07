import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";

export default function Home() {
  return (
    <main className="relative w-full min-h-screen bg-[#0A0A0A] pb-[100px] flex flex-col">
      {/* Hero Section - Viewport Fixed */}
      <Hero />

      {/* Content Flow - Natural Scrolling */}
      <FeaturedProducts />

      {/* Additional sections would follow here in flex-col flow */}
    </main>
  );
}
