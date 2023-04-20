import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { getDownloadURL } from "firebase/storage";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import "./App.css";

const firebaseConfig = {
  // Votre configuration Firebase
};

initializeApp(firebaseConfig);

const auth = getAuth();
const provider = new GoogleAuthProvider();
const db = getFirestore();
const storage = getStorage();

function App() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    animal: "",
    freeTime: "",
    photo: "",
    location: "",
  });

  const { firstName, lastName, animal, freeTime, photo, location } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Enregistrer la photo de profil dans Firebase Storage
    const photoRef = ref(storage, `users/${firstName}_${lastName}`);
    await uploadBytes(photoRef, photo);
    const photoUrl = await getDownloadURL(photoRef);

    // Enregistrer les données utilisateur dans Firestore
    await addDoc(collection(db, "users"), {
      firstName,
      lastName,
      animal,
      freeTime,
      photo: photoUrl,
      location,
    });

    // Réinitialiser le formulaire
    setFormData({
      firstName: "",
      lastName: "",
      animal: "",
      freeTime: "",
      photo: "",
      location: "",
    });
  };

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // L'utilisateur est connecté avec succès
      })
      .catch((error) => {
        // Gestion des erreurs
      });
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          value={firstName}
          onChange={handleChange}
          placeholder="Prénom"
        />
        <input
          type="text"
          name="lastName"
          value={lastName}
          onChange={handleChange}
          placeholder="Nom"
        />
        <input
          type="text"
          name="animal"
          value={animal}
          onChange={handleChange}
          placeholder="Animal préféré"
        />
        <input
          type="text"
          name="freeTime"
          value={freeTime}
          onChange={handleChange}
          placeholder="Temps libre préféré"
        />
        <input
          type="file"
          name="photo"
          onChange={(e) => setFormData({ ...formData, photo: e.target.files[0] })}
        />
        <input
          type="text"
          name="location"
          value={location}
          onChange={handleChange}
          placeholder="Ville"
        />
        <button type="submit">Envoyer</button>
      </form>

      <button onClick={signInWithGoogle}>Se connecter avec Google</button>
    </div>
  );
}

export default App;