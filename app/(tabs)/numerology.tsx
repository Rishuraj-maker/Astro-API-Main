import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { calculateLifePathNumber, calculateDestinyNumber } from '@/lib/zodiac';
import { numerologyInterpretations } from '@/data/horoscopes';

export default function NumerologyScreen() {
  const [fullName, setFullName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [lifePathNumber, setLifePathNumber] = useState<number | null>(null);
  const [destinyNumber, setDestinyNumber] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCalculate = async () => {
    if (!fullName || !dateOfBirth) {
      setError('Please fill in all fields');
      return;
    }

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(dateOfBirth)) {
      setError('Date format should be YYYY-MM-DD');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const lifePath = calculateLifePathNumber(dateOfBirth);
      const destiny = calculateDestinyNumber(fullName);

      setLifePathNumber(lifePath);
      setDestinyNumber(destiny);
    } catch (err: any) {
      setError(err.message || 'Calculation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Numerology Calculator</Text>
          <Text style={styles.subtitle}>Discover your life path and destiny numbers</Text>
        </View>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={fullName}
            onChangeText={setFullName}
            editable={!loading}
            placeholderTextColor="#999"
          />
          <TextInput
            style={styles.input}
            placeholder="Date of Birth (YYYY-MM-DD)"
            value={dateOfBirth}
            onChangeText={setDateOfBirth}
            editable={!loading}
            placeholderTextColor="#999"
          />

          {error && <Text style={styles.error}>{error}</Text>}

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleCalculate}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Calculate Numbers</Text>
            )}
          </TouchableOpacity>
        </View>

        {lifePathNumber !== null && destinyNumber !== null && (
          <>
            <View style={styles.resultCard}>
              <Text style={styles.resultLabel}>Life Path Number</Text>
              <Text style={styles.resultNumber}>{lifePathNumber}</Text>
              <Text style={styles.resultInterpretation}>
                {
                  numerologyInterpretations[
                    lifePathNumber as keyof typeof numerologyInterpretations
                  ]
                }
              </Text>
            </View>

            <View style={styles.resultCard}>
              <Text style={styles.resultLabel}>Destiny Number</Text>
              <Text style={styles.resultNumber}>{destinyNumber}</Text>
              <Text style={styles.resultInterpretation}>
                {
                  numerologyInterpretations[
                    destinyNumber as keyof typeof numerologyInterpretations
                  ]
                }
              </Text>
            </View>

            <View style={styles.infoCard}>
              <Text style={styles.infoTitle}>What Do These Numbers Mean?</Text>
              <Text style={styles.infoText}>
                Your Life Path Number reveals your natural talents and abilities, while your Destiny Number shows your life purpose and direction.
              </Text>
            </View>
          </>
        )}
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
  form: {
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    color: '#fff',
    backgroundColor: '#1e293b',
    fontSize: 14,
  },
  error: {
    color: '#ef4444',
    marginBottom: 12,
    fontSize: 14,
  },
  button: {
    backgroundColor: '#06b6d4',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  resultCard: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#06b6d4',
  },
  resultLabel: {
    fontSize: 12,
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  resultNumber: {
    fontSize: 48,
    fontWeight: '700',
    color: '#06b6d4',
    marginBottom: 12,
  },
  resultInterpretation: {
    fontSize: 14,
    color: '#cbd5e1',
    lineHeight: 20,
  },
  infoCard: {
    backgroundColor: '#334155',
    borderRadius: 12,
    padding: 20,
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
    lineHeight: 20,
  },
});
