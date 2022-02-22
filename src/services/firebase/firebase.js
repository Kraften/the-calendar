import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';
import 'dotenv/config';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: 'calendar-92ec5.firebaseapp.com',
    databaseURL: process.env.REACT_APP_DB_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: 'calendar-92ec5.appspot.com',
    messagingSenderId: '1006124787273',
    appId: '1:1006124787273:web:4361d8a41043cc8bc84198',
    measurementId: 'G-MEBDZXZCG5'
};
console.log(process.env);
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const dbFirestore = getFirestore();
const db = getDatabase(app);
const auth = getAuth();

export { auth, db, dbFirestore };
