'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function createOrder(formData: any) {
  const supabase = createClient();
  
  // 1. Authenticate user
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return { error: 'Authentication required for checkout.' };
  }

  const { items, total_amount, ...shippingData } = formData;

  if (!items || items.length === 0) {
    return { error: 'Your cart is empty.' };
  }

  // 2. Insert the main order
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      user_id: user.id,
      total_amount: total_amount,
      status: 'pending',
      shipping_address: shippingData.address,
      shipping_city: shippingData.city,
      shipping_phone: shippingData.phone,
    })
    .select()
    .single();

  if (orderError) {
    console.error('Order creation error:', orderError);
    return { error: 'Failed to process the order.' };
  }

  // 3. Insert order items
  const orderItems = items.map((item: any) => ({
    order_id: order.id,
    product_id: item.id,
    quantity: item.quantity,
    price_at_purchase: item.price,
  }));

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItems);

  if (itemsError) {
    console.error('Order items error:', itemsError);
    // Cleanup: In a real-world app, you might want to delete the order if item insertion fails
    return { error: 'Failed to record individual items.' };
  }

  revalidatePath('/dashboard');
  return { success: true, orderId: order.id };
}
