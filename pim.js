// Import etc
import firebase from 'firebase/app';
import 'firebase/firestore'; // ou tout autre module Firebase que vous souhaitez utiliser
import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';

// Configuration Firebase
const firebaseConfig = {
  // Votre configuration Firebase ici
};

// Initialisation Firebase
firebase.initializeApp(firebaseConfig);

firebase.initializeApp({
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
});

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const databaseRef = firebase.database().ref('data');
    databaseRef.on('value', snapshot => {
      const val = snapshot.val();
      setData(val);
    });
  }, []);

  return (
    <div>
      {data.map(item => (
        <p key={item.id}>{item.title}</p>
      ))}
    </div>
  );
}

export default App;