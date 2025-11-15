import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { horoscopes } from '@/data/horoscopes';

const ZODIAC_SIGNS = [
  'Aries',
  'Taurus',
  'Gemini',
  'Cancer',
  'Leo',
  'Virgo',
  'Libra',
  'Scorpio',
  'Sagittarius',
  'Capricorn',
  'Aquarius',
  'Pisces',
];

export default function HoroscopeScreen() {
  const { user } = useAuth();
  const [selectedZodiac, setSelectedZodiac] = useState(user?.zodiac_sign || 'Aries');

  const horoscope =
    horoscopes[selectedZodiac as keyof typeof horoscopes] ||
    'Cosmic energies are aligning for you today.';

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Daily Horoscope</Text>
          <Text style={styles.subtitle}>Explore your cosmic forecast</Text>
        </View>

        <View style={styles.currentZodiacCard}>
          <Text style={styles.currentZodiacLabel}>Today's Focus</Text>
          <Text style={styles.currentZodiac}>{selectedZodiac}</Text>
        </View>

        <View style={styles.horoscopeContent}>
          <Text style={styles.horoscopeTitle}>Your Forecast</Text>
          <Text style={styles.horoscopeText}>{horoscope}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Your Sign</Text>
          <View style={styles.gridContainer}>
            {ZODIAC_SIGNS.map((sign) => (
              <TouchableOpacity
                key={sign}
                style={[
                  styles.zodiacButton,
                  selectedZodiac === sign && styles.zodiacButtonActive,
                ]}
                onPress={() => setSelectedZodiac(sign)}
              >
                <Text
                  style={[
                    styles.zodiacButtonText,
                    selectedZodiac === sign && styles.zodiacButtonTextActive,
                  ]}
                >
                  {sign}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#94a3b8',
  },
  currentZodiacCard: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 24,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#8b5cf6',
  },
  currentZodiacLabel: {
    fontSize: 12,
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  currentZodiac: {
    fontSize: 36,
    fontWeight: '700',
    color: '#8b5cf6',
  },
  horoscopeContent: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
  },
  horoscopeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 12,
  },
  horoscopeText: {
    fontSize: 14,
    color: '#cbd5e1',
    lineHeight: 22,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 16,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  zodiacButton: {
    width: '48.5%',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    backgroundColor: '#1e293b',
  },
  zodiacButtonActive: {
    backgroundColor: '#8b5cf6',
    borderColor: '#8b5cf6',
  },
  zodiacButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#94a3b8',
  },
  zodiacButtonTextActive: {
    color: '#fff',
  },
});
