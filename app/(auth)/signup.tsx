
import { View, Text, StyleSheet, Alert } from 'react-native';
import React, { useState } from 'react';
import { ThemedView } from '../../components/themed-view';
import { ThemedText } from '../../components/themed-text';
import FormField from '../../components/FormField';
import { Link, router } from 'expo-router';
import { useGlobalContext } from '../../context/AuthContext';
import { signUp } from '../../firebase';

const SignUp = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if(form.username === "" || form.email === "" || form.password === "") {
      Alert.alert('Error', 'Please fill in all fields');
    }

    setIsSubmitting(true);

    try {
      const userCredential = await signUp(form.email, form.password);
      const user = userCredential.user;
      // Anda dapat menambahkan lebih banyak detail pengguna ke database di sini

      setUser(user);
      setIsLoggedIn(true);

      router.replace('/home');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Sign Up</ThemedText>

      <FormField 
        title="Username"
        value={form.username}
        handleChangeText={(e) => setForm({ ...form, username: e })}
        otherStyles={styles.formField}
      />

      <FormField 
        title="Email"
        value={form.email}
        handleChangeText={(e) => setForm({ ...form, email: e })}
        otherStyles={styles.formField}
        keyboardType="email-address"
      />

      <FormField 
        title="Password"
        value={form.password}
        handleChangeText={(e) => setForm({ ...form, password: e })}
        otherStyles={styles.formField}
        secureTextEntry
      />

      <View style={styles.buttonContainer}>
        <Text style={styles.button} onPress={submit}>{isSubmitting ? 'Submitting...' : 'Sign Up'}</Text>
      </View>

      <View style={styles.loginContainer}>
        <ThemedText>Have an account already?</ThemedText>
        <Link href="/login" style={styles.loginLink}>Login</Link>
      </View>

    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  formField: {
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 20,
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 5,
  },
  button: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginLink: {
    color: '#3498db',
    marginLeft: 5,
  }
})

export default SignUp;
