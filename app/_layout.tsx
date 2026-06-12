import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import ErrorBoundary from '@/components/ErrorBoundary';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { FavoritesProvider } from '@/src/context/FavoritesContext';

export const unstable_settings = {
  anchor: '(tabs)',
};

// Splash ekranının otomatik kapanmasını durdur
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  // Splash'i biz manuel kapatıyoruz
  useEffect(() => {
    const prepare = async () => {
      // (opsiyonel) biraz beklet — yükleniyormuş hissi
      await new Promise((resolve) => setTimeout(resolve, 1200));
      await SplashScreen.hideAsync();
    };

    prepare();
  }, []);

  return (
  <ErrorBoundary>
    <FavoritesProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen
            name="(tabs)"
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="modal"
            options={{ presentation: 'modal' }}
          />
        </Stack>

        <StatusBar style="auto" />
      </ThemeProvider>
    </FavoritesProvider>
  </ErrorBoundary>
);
 }
