// src/config/firebase.js
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration (replace with your actual values)
const firebaseConfig = {
    apiKey: 'AIzaSyAKfbxJGo8z4vGOvMmWFakba3_9PddWb1w',
    authDomain: 'moonair.firebaseapp.com',
    projectId: 'moonair-86e1f',
    storageBucket: 'moonair.appspot.com',
    messagingSenderId: '420427208476',
    appId: '1:1052345046058:android:02a094c945210d2501df53',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with persistence
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});

// Initialize Firestore
const db = getFirestore(app);

export { auth, db };