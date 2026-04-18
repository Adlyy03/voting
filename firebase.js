
import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    onAuthStateChanged,
    signOut as firebaseSignOut
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCkHakQ0u9jr3pxBxhbxAwY8lEy8RyGInI",
  authDomain: "voting-d4750.firebaseapp.com",
  projectId: "voting-d4750",
  storageBucket: "voting-d4750.firebasestorage.app",
  messagingSenderId: "307572200167",
  appId: "1:307572200167:web:408592d8523b005bfdc842",
  measurementId: "G-LB5WDKPYXT"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Fungsi untuk mendaftarkan pengguna baru
export const signUp = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
}

// Fungsi untuk login pengguna
export const signIn = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
}

// Fungsi untuk mendapatkan status pengguna saat ini
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      unsubscribe();
      resolve(user);
    }, reject);
  });
}

// Fungsi untuk logout pengguna
export const signOut = () => {
    return firebaseSignOut(auth);
}

export { db, auth };
