import storage from '@/helpers/auth';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { currentPathname, setCurrentPathname } from '@/utils/navigation-state';
import { useNavigation, useRoute } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { router, Stack, usePathname } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { DefaultTheme, PaperProvider } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: 1,
    },
    mutations: {
      retry: 1,
      onError: (error) => {
        console.error('Mutation error:', error);
      },
    },
  },
});

// const isWeb = Platform.OS === 'web';
queryClient.getQueryCache().subscribe((event) => {
  if (event?.query?.state?.status === 'error') {
    const error = event.query.state.error as any;

    if (error?.response?.status === 401 || error?.response?.status === 403) {
      (async () => {
        try {
          if (currentPathname !== '/login') {
            await storage.deleteItem('user');
            await storage.deleteItem('token');
            await router.replace('/login');
          }
        } catch (err) {
          console.error('Error during logout process:', err);
        }
      })();
    }
  }
});

export default function RootLayout() {
  useFrameworkReady();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const navigation = useNavigation();
  const route = useRoute();

  const title = navigation
    ?.getState()
    ?.routes.find((r) => r.key === route.key)?.name;

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  const pathname = usePathname();

  useEffect(() => {
    setCurrentPathname(pathname);
  }, [pathname]);

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <PaperProvider theme={DefaultTheme}>
          <SafeAreaView
            style={styles.container}
            edges={['top', 'left', 'right']}
          >
            <Stack screenOptions={{ headerShown: false }} />
            <StatusBar style="dark" />
          </SafeAreaView>
          <Toast position="top" swipeable />
        </PaperProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
