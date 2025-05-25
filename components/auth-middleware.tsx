import { isUserLoggedIn } from '@/helpers/auth';
import { router, Slot, useSegments } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function AuthMiddleware() {
  const [isChecking, setIsChecking] = useState(true);
  const segments = useSegments();

  useEffect(() => {
    if (!segments || segments.length) return;

    const checkAuth = async () => {
      try {
        const loggedIn = await isUserLoggedIn();
        const inAppGroup = segments[0] === '(app)';

        if (!loggedIn && inAppGroup) {
          router.replace('/login');
        } else if (loggedIn && !inAppGroup) {
          router.replace('/');
        }

        setIsChecking(false);
      } catch (error) {
        console.error('Error checking authentication:', error);
        setIsChecking(false);
      }
    };

    checkAuth();
  }, [segments]);

  if (isChecking) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Slot />;
}
