import React, { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Asset } from 'expo-asset';
import { Ionicons } from '@expo/vector-icons';
import { ThemeProvider } from 'styled-components/native';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  NotoSansKR_100Thin,
  NotoSansKR_300Light,
  NotoSansKR_400Regular,
  NotoSansKR_500Medium,
  NotoSansKR_700Bold,
  NotoSansKR_900Black,
} from '@expo-google-fonts/noto-sans-kr';

import customTheme from '@styles/theme';

import MainNav from '@navigators/MainNav';

import Logo from '@assets/logo.jpg';

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function App(): React.ReactElement {
  const [loading, setLoading] = useState(true);
  const preload = async () => {
    try {
      await SplashScreen.preventAutoHideAsync();
      const fontsToLoad = [Ionicons.font];
      const fontPromises = fontsToLoad.map((font) => Font.loadAsync(font));
      const imagesToLoad = [Logo];
      const imagePromises = imagesToLoad.map((image) => Asset.loadAsync(image));
      await Promise.all<void | Asset[]>([
        ...fontPromises,
        ...imagePromises,
        Font.loadAsync({
          NotoSansKR_100Thin,
          NotoSansKR_300Light,
          NotoSansKR_400Regular,
          NotoSansKR_500Medium,
          NotoSansKR_700Bold,
          NotoSansKR_900Black,
        }),
      ]);
    } catch (error) {
      alert(error);
    } finally {
      await SplashScreen.hideAsync();
      setLoading(false);
    }
  };

  useEffect(() => {
    preload();
  }, []);

  if (loading) return <></>;

  return (
    <QueryClientProvider client={client}>
      <ThemeProvider theme={customTheme}>
        <NavigationContainer>
          <MainNav />
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
