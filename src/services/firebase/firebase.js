import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyCF5Abb2EMtI-yqa4izpADm8RqyLiLbkrs',
    authDomain: 'calendar-92ec5.firebaseapp.com',
    databaseURL:
        'https://calendar-92ec5-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'calendar-92ec5',
    storageBucket: 'calendar-92ec5.appspot.com',
    messagingSenderId: '1006124787273',
    appId: '1:1006124787273:web:4361d8a41043cc8bc84198',
    measurementId: 'G-MEBDZXZCG5'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const dbFirestore = getFirestore();
const db = getDatabase(app);
const auth = getAuth();

export { auth, db, dbFirestore };
