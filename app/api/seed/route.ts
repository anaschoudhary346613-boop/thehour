import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    // 1. Wipe existing watches
    const { error: deleteError } = await supabase
      .from('watches')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all rows

    if (deleteError) throw deleteError;

    // 2. Sample Luxury Data
    const seedData = [
      {
        name: "The Royal Oak Selfwinding",
        brand: "Audemars Piguet",
        price: 2450000,
        stock: 2,
        description: "The quintessential luxury sports watch in brushed steel with a Grande Tapisserie dial.",
        category: "Automatic",
        gender: "Men",
        hero_image_url: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80" 
      },
      {
        name: "Cosmograph Daytona",
        brand: "Rolex",
        price: 3100000,
        stock: 1,
        description: "An icon of motorsport horology featuring a black Cerachrom bezel and 18ct yellow gold casing.",
        category: "Chronograph",
        gender: "Men",
        hero_image_url: "https://images.unsplash.com/photo-1547996160-81dfa63595dd?auto=format&fit=crop&q=80"
      },
      {
        name: "Calatrava Classic",
        brand: "Patek Philippe",
        price: 1850000,
        stock: 0,
        description: "The purest face of time. A masterclass in minimalist heritage design crafted in rose gold.",
        category: "Heritage",
        gender: "Unisex",
        hero_image_url: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80"
      },
      {
        name: "Tank Must",
        brand: "Cartier",
        price: 280000,
        stock: 5,
        description: "A timeless geometric masterpiece with blued-steel sword-shaped hands and a beaded crown.",
        category: "Heritage",
        gender: "Women",
        hero_image_url: "https://images.unsplash.com/photo-1524805444758-089113d67d20?auto=format&fit=crop&q=80"
      },
      {
        name: "Seamaster Diver 300M",
        brand: "Omega",
        price: 450000,
        stock: 3,
        description: "Professional dive watch featuring a laser-engraved wave dial and a Co-Axial Master Chronometer movement.",
        category: "Automatic",
        gender: "Men",
        hero_image_url: "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&q=80"
      }
    ];

    // 3. Inject new assets
    const { error: insertError } = await supabase
      .from('watches')
      .insert(seedData);

    if (insertError) throw insertError;

    return NextResponse.json({ 
      success: true,
      message: "Database successfully reset and seeded with 5 luxury assets.",
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}
