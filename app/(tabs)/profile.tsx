
import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { ThemedView } from '@/components/themed-view';
import { useGlobalContext } from '../../context/AuthContext';
import { signOut } from '../../firebase';
import { router } from 'expo-router';

const Profile = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext();

  const handleLogout = async () => {
    try {
      await signOut();
      setUser(null);
      setIsLoggedIn(false);
      router.replace('/login');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ThemedView style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      {/* Di sini Anda dapat menampilkan informasi pengguna lainnya */}

      <View style={styles.buttonContainer}>
        <Text style={styles.button} onPress={handleLogout}>Logout</Text>
      </View>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 20,
    backgroundColor: '#e74c3c',
    padding: 15,
    borderRadius: 5,
    width: '100%',
  },
  button: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  }
});

export default Profile;
