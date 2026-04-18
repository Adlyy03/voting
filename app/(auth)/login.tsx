
import { View, Text, StyleSheet, Alert } from 'react-native';
import React, { useState } from 'react';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import FormField from '@/components/FormField';
import { Link, router } from 'expo-router';
import { useGlobalContext } from '../../context/AuthContext';
import { signIn } from '../../firebase';

const Login = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if(form.email === "" || form.password === "") {
      Alert.alert('Error', 'Please fill in all fields');
    }

    setIsSubmitting(true);

    try {
      const userCredential = await signIn(form.email, form.password);
      const user = userCredential.user;

      setUser(user);
      setIsLoggedIn(true);

      Alert.alert("Success", "User signed in successfully");
      router.replace('/home');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Login</ThemedText>

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
        <Text style={styles.button} onPress={submit}>{isSubmitting ? 'Submitting...' : 'Login'}</Text>
      </View>

      <View style={styles.signupContainer}>
        <ThemedText>Don't have an account?</ThemedText>
        <Link href="/signup" style={styles.signupLink}>Signup</Link>
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
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signupLink: {
    color: '#3498db',
    marginLeft: 5,
  }
})

export default Login;
