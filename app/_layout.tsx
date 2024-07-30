// RootLayout.tsx or RootLayout.js

import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { TamaguiProvider, Theme } from 'tamagui';
import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import { useFonts } from 'expo-font';
import { tamaguiConfig } from '@/tamagui.config';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  useEffect(() => {
    if (loaded) {
      // Can hide splash screen here
    }
  }, [loaded]);

  if (!loaded) {
    return null; // or some loading component
  }

  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme={'dark'}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <Theme name={colorScheme === 'dark' ? 'dark' : 'light'}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </Theme>
    </TamaguiProvider>
  );
}
