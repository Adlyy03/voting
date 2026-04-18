
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { db } from '../../firebase'; // Sesuaikan path jika perlu
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [poll, setPoll] = useState(null);
  const [voted, setVoted] = useState(false);

  useEffect(() => {
    // Mengecek status voting dari AsyncStorage saat komponen dimuat
    const checkVotedStatus = async () => {
      try {
        const value = await AsyncStorage.getItem('voted');
        if (value !== null) {
          setVoted(true);
        }
      } catch (e) {
        console.error("Gagal membaca data dari AsyncStorage", e);
      }
    };

    checkVotedStatus();

    // Mengambil data polling dari Firestore secara realtime
    const pollDocRef = doc(db, 'polls', 'poll1');
    const unsubscribe = onSnapshot(pollDocRef, (doc) => {
      if (doc.exists()) {
        setPoll({ id: doc.id, ...doc.data() });
      } else {
        console.log("Tidak ada dokumen polling!");
      }
    });

    // Unsubscribe dari snapshot listener saat komponen dibongkar
    return () => unsubscribe();
  }, []);

  // Fungsi untuk menangani voting
  const handleVote = async (optionIndex) => {
    if (voted || !poll) return; // Mencegah voting jika sudah vote atau data poll belum ada

    // Membuat salinan dari array options untuk menghindari mutasi langsung
    const newOptions = [...poll.options];
    newOptions[optionIndex].votes += 1;

    // Update data di Firestore
    const pollDocRef = doc(db, 'polls', 'poll1');
    try {
      await updateDoc(pollDocRef, { options: newOptions });

      // Simpan status voting ke AsyncStorage
      await AsyncStorage.setItem('voted', 'true');
      setVoted(true); // Disable tombol setelah vote

    } catch (error) {
      console.error("Gagal update data ke Firestore: ", error);
    }
  };

  if (!poll) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{poll.title}</Text>
      {poll.options.map((option, index) => (
        <View key={index} style={styles.optionContainer}>
          <Button
            title={`${option.name} (${option.votes})`}
            onPress={() => handleVote(index)}
            disabled={voted} // Disable tombol jika sudah vote
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  optionContainer: {
    marginVertical: 10,
    width: '80%',
  },
});
