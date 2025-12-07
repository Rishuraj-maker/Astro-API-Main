import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  Animated,
  Easing,
  Modal,
  ScrollView,
} from "react-native";
import { shuffleTarot } from "@/data/tarot";

export default function TarotScreen() {
  const [deck, setDeck] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [showMeaning, setShowMeaning] = useState(null);

  const spinValue = new Animated.Value(0);

  const spinAnimation = () => {
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 900,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start(() => spinValue.setValue(0));
  };

  const shuffleDeck = () => {
    spinAnimation();
    const shuffled = shuffleTarot();
    setDeck(shuffled);
    setSelectedCards([]);
  };

  const pickThreeCards = () => {
    if (deck.length < 3) return;
    setSelectedCards(deck.slice(0, 3));
  };

  const flipCard = (card) => {
    setShowMeaning(card);
  };

  const spinInterpolate = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🔮 Dark Mystic Tarot</Text>

      {/* Shuffle Button */}
      <Pressable style={styles.shuffleBtn} onPress={shuffleDeck}>
        <Animated.Text
          style={[styles.shuffleText, { transform: [{ rotate: spinInterpolate }] }]}
        >
          🔄 Shuffle Deck
        </Animated.Text>
      </Pressable>

      {/* Pick Cards Button */}
      <Pressable style={styles.pickBtn} onPress={pickThreeCards}>
        <Text style={styles.pickText}>✨ Draw 3 Cards</Text>
      </Pressable>

      {/* Card Layout */}
      {selectedCards.length > 0 && (
        <View style={styles.cardRow}>
          {selectedCards.map((card, index) => (
            <Pressable key={index} onPress={() => flipCard(card)}>
              <Image
                source={{ uri: card.image }}
                style={styles.card}
                resizeMode="contain"
              />
              <Text style={styles.positionLabel}>
                {index === 0 && "PAST"}
                {index === 1 && "PRESENT"}
                {index === 2 && "FUTURE"}
              </Text>
            </Pressable>
          ))}
        </View>
      )}

      {/* Card Meaning Modal */}
      <Modal visible={showMeaning !== null} transparent animationType="slide">
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <ScrollView>
              <Text style={styles.cardTitle}>{showMeaning?.name}</Text>

              <Image
                source={{ uri: showMeaning?.image }}
                style={styles.modalImage}
                resizeMode="contain"
              />

              <Text style={styles.meaningHeader}>Upright Meaning</Text>
              <Text style={styles.meaningText}>{showMeaning?.meaning_up}</Text>

              <Text style={styles.meaningHeader}>Reversed Meaning</Text>
              <Text style={styles.meaningText}>{showMeaning?.meaning_rev}</Text>
            </ScrollView>

            <Pressable
              style={styles.closeBtn}
              onPress={() => setShowMeaning(null)}
            >
              <Text style={styles.closeText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// --------------------- STYLES -----------------------

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f172a", padding: 20 },

  header: {
    color: "white",
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
  },

  shuffleBtn: {
    backgroundColor: "#334155",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  shuffleText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },

  pickBtn: {
    backgroundColor: "#3b82f6",
    padding: 12,
    borderRadius: 10,
  },
  pickText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "600",
  },

  cardRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 30,
  },

  card: {
    width: 110,
    height: 210,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#475569",
  },

  positionLabel: {
    color: "#94a3b8",
    textAlign: "center",
    marginTop: 8,
    fontWeight: "700",
  },

  modal: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "85%",
    backgroundColor: "#1e293b",
    padding: 20,
    borderRadius: 12,
    maxHeight: "80%",
  },

  cardTitle: {
    color: "white",
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 10,
  },

  modalImage: {
    width: "100%",
    height: 240,
    marginBottom: 15,
  },

  meaningHeader: {
    color: "#3b82f6",
    fontSize: 18,
    fontWeight: "700",
    marginTop: 12,
  },

  meaningText: {
    color: "#e2e8f0",
    fontSize: 15,
    marginTop: 4,
    lineHeight: 20,
  },

  closeBtn: {
    marginTop: 20,
    backgroundColor: "#ef4444",
    padding: 10,
    borderRadius: 8,
  },

  closeText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
});
