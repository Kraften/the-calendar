// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCF5Abb2EMtI-yqa4izpADm8RqyLiLbkrs",
  authDomain: "calendar-92ec5.firebaseapp.com",
  projectId: "calendar-92ec5",
  storageBucket: "calendar-92ec5.appspot.com",
  messagingSenderId: "1006124787273",
  appId: "1:1006124787273:web:4361d8a41043cc8bc84198",
  measurementId: "G-MEBDZXZCG5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
export { auth };
