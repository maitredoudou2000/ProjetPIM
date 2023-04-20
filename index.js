import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
//configuration de firebase
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCpsuvNM4N8BNf5CduRZayyRTjahS-Uf4A",
  authDomain: "pet-for-life-d7c4f.firebaseapp.com",
  projectId: "pet-for-life-d7c4f",
  storageBucket: "pet-for-life-d7c4f.appspot.com",
  messagingSenderId: "799976506715",
  appId: "1:799976506715:web:fbc6d09a490233599a867e",
  measurementId: "G-CQ04VH85S6"
};
// Initialize Firebase

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Access Firestore
const firestore = getFirestore(app);

// Use Firestore in your app
firestore.collection("users").add({
  first: "Ada",
  last: "Lovelace",
  born: 1815
})
.then((docRef) => {
  console.log("Document written with ID: ", docRef.id);
})
.catch((error) => {
  console.error("Error adding document: ", error);
});

reportWebVitals();
// Maintenant, vous pouvez utiliser l'objet `firestore` pour effectuer des opérations de base de données Firestore