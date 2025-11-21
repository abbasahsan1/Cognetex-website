import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBiOSzaI93kFUXubcE4L6junRhmMPY58UA",
    authDomain: "cognetex-3b55d.firebaseapp.com",
    projectId: "cognetex-3b55d",
    storageBucket: "cognetex-3b55d.firebasestorage.app",
    messagingSenderId: "77812984468",
    appId: "1:77812984468:web:e54bf9a789e2606043a281",
    measurementId: "G-NX5YL6XCWW"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };
