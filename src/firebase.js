// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwZdJShMSLPRQhbXZXFDZNh5H2UdNiSzg", 
  // NOTE: In a real production app, consider using environment variables for API keys
  authDomain: "sterlingresearch-68afe.firebaseapp.com",
  databaseURL: "https://sterlingresearch-68afe-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "sterlingresearch-68afe",
  storageBucket: "sterlingresearch-68afe.firebasestorage.app",
  messagingSenderId: "1026424949915",
  appId: "1:1026424949915:web:b2e375394d2faad8110a3e",
  measurementId: "G-GTSHXXTTBT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const database = getDatabase(app);

export { app, analytics, auth, database };
