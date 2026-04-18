import 'react-native-gesture-handler';

import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import GlobalProvider, { useGlobalContext } from '@/context/AuthContext';

// Mencegah splash screen dari auto-hiding sebelum semua aset selesai dimuat.
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const { isLoading, isLoggedIn } = useGlobalContext();

  useEffect(() => {
    if (!isLoading) {
      SplashScreen.hideAsync();
    }
  }, [isLoading]);

  if (isLoading) {
    return null; // Tampilkan null atau komponen loading spinner selagi menunggu
  }

  return (
      <Stack screenOptions={{ headerShown: false }}>
        {/* Tergantung pada status login, tampilkan grup rute yang sesuai */}
        {isLoggedIn ? (
          <Stack.Screen name="(tabs)" />
        ) : (
          <Stack.Screen name="(auth)" />
        )}
      </Stack>
  );
};

// Komponen utama yang membungkus semuanya dalam provider
const App = () => {
  return (
    <GlobalProvider>
      <RootLayout />
    </GlobalProvider>
  );
};

export default App;
