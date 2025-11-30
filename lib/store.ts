import { supabase } from '@/lib/supabase';

export async function fetchProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*');

  if (error) throw error;
  return data;
}

export async function getCart(userId: string) {
  const { data, error } = await supabase
    .from('cart_items')
    .select('*, products(*)')
    .eq('user_id', userId);

  if (error) throw error;
  return data;
}

export async function addToCart(userId: string, productId: string) {
  const { data: existing } = await supabase
    .from('cart_items')
    .select('*')
    .eq('user_id', userId)
    .eq('product_id', productId)
    .single();

  if (existing) {
    return await supabase
      .from('cart_items')
      .update({ quantity: existing.quantity + 1 })
      .eq('id', existing.id);
  }

  return await supabase
    .from('cart_items')
    .insert([{ user_id: userId, product_id: productId, quantity: 1 }]);
}

export async function updateCartQuantity(id: string, quantity: number) {
  return await supabase
    .from('cart_items')
    .update({ quantity })
    .eq('id', id);
}

export async function removeCartItem(id: string) {
  return await supabase
    .from('cart_items')
    .delete()
    .eq('id', id);
}

export async function clearCart(userId: string) {
  return await supabase
    .from('cart_items')
    .delete()
    .eq('user_id', userId);
}
