import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useAuth } from '@/context/AuthContext';

export default function HomeScreen() {
  const { user } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Welcome back,</Text>
          <Text style={styles.name}>{user?.full_name}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Your Zodiac Sign</Text>
          <Text style={styles.zodiac}>{user?.zodiac_sign}</Text>
          <Text style={styles.cardDescription}>
            Explore your cosmic personality and daily insights
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>What Would You Like to Explore?</Text>
          <Text style={styles.description}>
            Visit the Horoscope tab to read your daily forecast, check the Numerology tab to discover your life path, or share your feedback with us.
          </Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Quick Tips</Text>
          <Text style={styles.infoText}>• Check your daily horoscope for cosmic guidance</Text>
          <Text style={styles.infoText}>• Discover your numerology numbers and their meanings</Text>
          <Text style={styles.infoText}>• Track your personal growth through the app</Text>
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
    marginBottom: 32,
  },
  greeting: {
    fontSize: 16,
    color: '#94a3b8',
    marginBottom: 4,
  },
  name: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff',
  },
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 12,
  },
  zodiac: {
    fontSize: 28,
    fontWeight: '700',
    color: '#3b82f6',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#cbd5e1',
  },
  description: {
    fontSize: 14,
    color: '#cbd5e1',
    lineHeight: 20,
  },
  infoCard: {
    backgroundColor: '#334155',
    borderRadius: 12,
    padding: 20,
    marginTop: 8,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#cbd5e1',
    marginBottom: 8,
    lineHeight: 20,
  },
});
