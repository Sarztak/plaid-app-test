import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface PreLinkScreenProps {
  onContinue: () => void;
  onManualEntry: () => void;
}

export default function PreLinkScreen({ onContinue, onManualEntry }: PreLinkScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.headline}>Add a bank account instantly</Text>
      <Text style={styles.subtext}>
        Securely connect your bank with Plaid to finish setup in minutes.
      </Text>

      <View style={styles.bullets}>
        <Text style={styles.bullet}>• Verify your account faster</Text>
        <Text style={styles.bullet}>• Avoid manual entry</Text>
      </View>

      <Text style={styles.disclosure}>
        We'll use your bank account information to verify your account and enable transfers.
      </Text>
      <Text style={styles.security}>
        Plaid uses 256-bit encryption, and your bank credentials are not shared with us.
      </Text>

      <TouchableOpacity style={styles.cta} onPress={onContinue}>
        <Text style={styles.ctaText}>Add instantly</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onManualEntry}>
        <Text style={styles.secondary}>Enter details manually</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#000',
  },
  headline: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtext: {
    fontSize: 16,
    color: '#aaa',
    textAlign: 'center',
    marginBottom: 24,
  },
  bullets: {
    marginBottom: 24,
  },
  bullet: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 8,
  },
  disclosure: {
    fontSize: 13,
    color: '#888',
    textAlign: 'center',
    marginBottom: 12,
  },
  security: {
    fontSize: 13,
    color: '#888',
    textAlign: 'center',
    marginBottom: 32,
  },
  cta: {
    backgroundColor: '#6366f1',
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
  },
  ctaText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  secondary: {
    color: '#6366f1',
    fontSize: 14,
  },
});
