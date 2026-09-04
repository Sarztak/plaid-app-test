import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type PostLinkStatus = 'success' | 'error' | 'cancelled';

interface PostLinkScreenProps {
  status: PostLinkStatus;
  errorMessage?: string;
  onRetry: () => void;
  onContinue: () => void;
}

export default function PostLinkScreen({ status, errorMessage, onRetry, onContinue }: PostLinkScreenProps) {
  const content = {
    success: {
      title: 'Bank account connected!',
      message: 'Your bank account has been successfully linked.',
      action: 'Continue',
      onAction: onContinue,
    },
    error: {
      title: 'Connection failed',
      message: errorMessage || "We couldn't connect your bank account. Please try again.",
      action: 'Try again',
      onAction: onRetry,
    },
    cancelled: {
      title: 'No account connected',
      message: 'You can try again whenever you\'re ready.',
      action: 'Try again',
      onAction: onRetry,
    },
  };

  const { title, message, action, onAction } = content[status];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>

      <TouchableOpacity style={styles.cta} onPress={onAction}>
        <Text style={styles.ctaText}>{action}</Text>
      </TouchableOpacity>

      {status !== 'success' && (
        <TouchableOpacity onPress={onContinue}>
          <Text style={styles.secondary}>Continue without linking</Text>
        </TouchableOpacity>
      )}
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 12,
  },
  message: {
    fontSize: 16,
    color: '#aaa',
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
