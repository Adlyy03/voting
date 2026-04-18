
import { Redirect, router } from 'expo-router';
import { SafeAreaView, View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useGlobalContext } from '../context/AuthContext';
import CustomButton from '../components/custom-button';
import { images } from '../constants'; // Pastikan Anda memiliki file ini dengan ekspor gambar

export default function App() {
  const { isLoading, isLoggedIn } = useGlobalContext();

  if (!isLoading && isLoggedIn) {
    return <Redirect href="/(tabs)/home" />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View style={styles.contentContainer}>
          <Image 
            source={images.logo} // Ganti dengan path logo Anda
            style={styles.logo}
            resizeMode="contain"
          />
          
          <Image 
            source={images.cards} // Ganti dengan path gambar utama Anda
            style={styles.mainImage}
            resizeMode="contain"
          />

          <View style={styles.textContainer}>
            <Text style={styles.title}>
              Temukan Jajak Pendapat & Buat Keputusan dengan {' '}
              <Text style={styles.appName}>DailyPoll</Text>
            </Text>
            <Text style={styles.subtitle}>
              Di mana setiap suara penting. Bergabunglah dengan komunitas dan biarkan pendapat Anda didengar.
            </Text>
          </View>

          <CustomButton 
            title="Lanjutkan dengan Email"
            handlePress={() => router.push('/login')}
            containerStyles={{ width: '100%', marginTop: 20 }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#161622', // Latar belakang gelap
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  logo: {
    width: 130,
    height: 84,
  },
  mainImage: {
    width: 380,
    height: 300,
  },
  textContainer: {
    position: 'relative',
    marginTop: 20,
  },
  title: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  appName: {
    color: '#FF9C01', // Warna aksen
  },
  subtitle: {
    fontSize: 14,
    color: '#CDCDE0',
    fontWeight: 'normal',
    textAlign: 'center',
    marginTop: 20,
  },
});
