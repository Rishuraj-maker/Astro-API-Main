import { useEffect, useState } from 'react';
import { View, Text, Pressable, Image, FlatList, StyleSheet, Alert } from 'react-native';
import { getCart, updateCartQuantity, removeCartItem, clearCart } from '@/lib/store';
import { useAuth } from '@/context/AuthContext';

export default function CartScreen() {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);

  const loadCart = async () => {
    const items = await getCart(user.id);
    setCart(items);
  };

  useEffect(() => {
    loadCart();
  }, []);

  const total = cart.reduce(
    (sum, i) => sum + i.products.price * i.quantity,
    0
  );

  const checkout = async () => {
    await clearCart(user.id);
    Alert.alert('Success', 'Your order has been placed!');
    setCart([]);
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Image source={{ uri: item.products.image_url }} style={styles.image} />

            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.products.name}</Text>
              <Text style={styles.price}>${item.products.price}</Text>

              <View style={styles.qtyRow}>
                <Pressable
                  style={styles.qtyBtn}
                  onPress={() => {
                    const newQuantity = item.quantity - 1;
                    updateCartQuantity(item.id, newQuantity);
                    loadCart();
                  }}
                >
                  <Text style={styles.qtyText}>-</Text>
                </Pressable>

                <Text style={styles.qtyNumber}>{item.quantity}</Text>

                <Pressable
                  style={styles.qtyBtn}
                  onPress={() => {
                    updateCartQuantity(item.id, item.quantity + 1);
                    loadCart();
                  }}
                >
                  <Text style={styles.qtyText}>+</Text>
                </Pressable>

                <Pressable
                  onPress={() => {
                    removeCartItem(item.id);
                    loadCart();
                  }}
                >
                  <Text style={{ color: 'red', marginLeft: 10 }}>Remove</Text>
                </Pressable>
              </View>
            </View>
          </View>
        )}
      />

      <View style={styles.footer}>
        <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>

        <Pressable style={styles.checkout} onPress={checkout}>
          <Text style={styles.checkoutText}>Checkout</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', marginBottom: 20, backgroundColor: '#1e293b', padding: 12, borderRadius: 10 },
  image: { width: 70, height: 70, borderRadius: 8, marginRight: 12 },
  name: { color: '#fff', fontSize: 16, fontWeight: '600' },
  price: { color: '#3b82f6', marginVertical: 6 },
  qtyRow: { flexDirection: 'row', alignItems: 'center' },
  qtyBtn: { padding: 6, borderWidth: 1, borderColor: '#ccc', borderRadius: 6 },
  qtyText: { color: '#fff', fontSize: 16 },
  qtyNumber: { color: '#fff', marginHorizontal: 10 },
  footer: { paddingVertical: 20, borderTopWidth: 1, borderColor: '#334155' },
  total: { color: '#fff', fontSize: 20, fontWeight: '700', marginBottom: 12 },
  checkout: { backgroundColor: '#3b82f6', padding: 12, borderRadius: 10 },
  checkoutText: { color: '#fff', fontWeight: '600', textAlign: 'center' },
});
