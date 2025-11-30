import { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  FlatList,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Alert,
} from 'react-native';
import { fetchProducts, addToCart } from '@/lib/store';
import { useAuth } from '@/context/AuthContext';

const { width } = Dimensions.get('screen');
const CARD_WIDTH = width * 0.92;   // 92% of screen width (works on all devices)

export default function StoreScreen() {
  const [products, setProducts] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    (async () => {
      const items = await fetchProducts();
      setProducts(items);
    })();
  }, []);

  const handleAddToCart = async (productId: string) => {
    try {
      await addToCart(user.id, productId);
      Alert.alert("Added to Cart", "Product added successfully!");
    } catch (e) {
      Alert.alert("Error", "Unable to add to cart.");
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={{ uri: item.image_url }}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.cardContent}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>₹{item.price}</Text>

        <Pressable
          style={styles.button}
          onPress={() => handleAddToCart(item.id)}
        >
          <Text style={styles.buttonText}>Add to Cart</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <ImageBackground
      source={{ uri: "https://images.indianexpress.com/2019/10/horoscope.jpg?w=414" }}
      style={styles.bg}
      resizeMode="cover"
    >
      <View style={styles.overlay} />

      <View style={styles.centerWrapper}>
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  centerWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  listContent: {
    paddingTop: 16,
    paddingBottom: 120,
    alignItems: 'center',
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: 'rgba(30,41,59,0.9)',
    borderRadius: 12,
    marginBottom: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#334155',
  },
  image: {
    width: '100%',
    height: 480,
  },
  cardContent: {
    padding: 16,
  },
  name: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  price: {
    color: '#3b82f6',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#3b82f6',
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
});
