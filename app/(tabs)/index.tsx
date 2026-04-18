
import React, { useState, useEffect } from 'react';
import { Button, StyleSheet } from 'react-native';
import { db } from '../../firebase'; // Pastikan path ini benar
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';

export default function App() {
  const [poll, setPoll] = useState(null);
  const [voted, setVoted] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
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
    console.log("Mencoba mengambil data polling dari Firestore...");

    const pollDocRef = doc(db, 'polls', 'poll1');
    const unsubscribe = onSnapshot(pollDocRef, 
      (doc) => {
        if (doc.exists()) {
          console.log("Data polling berhasil diambil:", doc.data());
          setPoll({ id: doc.id, ...doc.data() });
        } else {
          console.log("Dokumen polling (polls/poll1) tidak ditemukan!");
          setError("Data polling tidak ditemukan.");
        }
      },
      (err) => {
        console.error("Error saat mengambil data Firestore: ", err);
        setError("Gagal mengambil data. Kemungkinan karena masalah perizinan (security rules).");
      }
    );

    return () => unsubscribe();
  }, []);

  const handleVote = async (optionIndex) => {
    if (voted || !poll) return;

    const newOptions = [...poll.options];
    newOptions[optionIndex].votes += 1;

    const pollDocRef = doc(db, 'polls', 'poll1');
    try {
      await updateDoc(pollDocRef, { options: newOptions });
      await AsyncStorage.setItem('voted', 'true');
      setVoted(true);
    } catch (error) {
      console.error("Gagal update data ke Firestore: ", error);
    }
  };

  if (error) {
    return <ThemedText style={styles.errorText}>{error}</ThemedText>;
  }

  if (!poll) {
    return <ThemedText>Loading...</ThemedText>;
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>{poll.title}</ThemedText>
      {poll.options.map((option, index) => (
        <ThemedView key={index} style={styles.optionContainer}>
          <Button
            title={`${option.name} (${option.votes})`}
            onPress={() => handleVote(index)}
            disabled={voted}
          />
        </ThemedView>
      ))}
    </ThemedView>
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
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    padding: 20,
  },
});
