
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCkHakQ0u9jr3pxBxhbxAwY8lEy8RyGInI",
  authDomain: "voting-d4750.firebaseapp.com",
  projectId: "voting-d4750",
  storageBucket: "voting-d4750.firebasestorage.app",
  messagingSenderId: "307572200167",
  appId: "1:307572200167:web:408592d8523b005bfdc842",
  measurementId: "G-LB5WDKPYXT"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);

// Inisialisasi Firestore
const db = getFirestore(app);

export { db };
