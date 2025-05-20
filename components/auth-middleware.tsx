import { isUserLoggedIn } from '@/helpers/auth';
import { router, Slot, useSegments } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export default function AuthMiddleware() {
  const [isChecking, setIsChecking] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const segments = useSegments();

  useEffect(() => {
    if (!segments || !segments.length) return;

    const checkAuth = async () => {
      try {
        const loggedIn = await isUserLoggedIn();
        const inAppGroup = segments[0] === '(app)';

        if (!loggedIn && inAppGroup) {
          router.replace('/login');
        } else if (loggedIn && !inAppGroup) {
          router.replace('/');
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        setError('Failed to initialize app. Please try again.');
      } finally {
        setIsChecking(false);
      }
    };

    checkAuth();
  }, [segments]);

  if (isChecking) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return <Slot />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    fontSize: 16,
  },
});