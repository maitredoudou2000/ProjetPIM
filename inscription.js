import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { getDownloadURL } from "firebase/storage";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import "./App.css";

const firebaseConfig = {
  apiKey: "your_api_key",
  authDomain: "your_auth_domain",
  projectId: "your_project_id",
  storageBucket: "your_storage_bucket",
  messagingSenderId: "your_messaging_sender_id",
  appId: "your_app_id",
  measurementId: "your_measurement_id"
};

initializeApp(firebaseConfig);

const auth = getAuth();
const provider = new GoogleAuthProvider();
const db = getFirestore();
const storage = getStorage();

function Inscription() {
  const [formData, setFormData] = useState({
    prénom: "",
    nom: "",
    animal: "",
    freeTime: "",
    photo: "",
    emplacement: "",
    motDePasse: ""
  }); 

  const { prénom, nom, animal, freeTime, photo, emplacement, motDePasse } = formData; 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Enregistrer la photo de profil dans Firebase Storage
    const photoRef = ref(storage, `users/${prénom}_${nom}`);
    await uploadBytes(photoRef, photo);
    const photoUrl = await getDownloadURL(photoRef);

    // Enregistrer les données utilisateur dans Firestore
    await addDoc(collection(db, "users"), {
      prénom,
      nom,
      animal,
      "temps libre": freeTime,
      photo: photoUrl,
      emplacement,
    });

    // Créer un compte utilisateur avec email et mot de passe
    await createUserWithEmailAndPassword(auth, prénom + '.' + nom + '@example.com', motDePasse);

    // Réinitialiser le formulaire
    setFormData({
      prénom: "",
      nom: "",
      animal: "",
      freeTime: "",
      photo: "",
      emplacement: "",
      motDePasse: ""
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
          name="prénom"
          value={prénom}
          onChange={handleChange}
          placeholder="Prénom"
        />
        <input
          type="text"
          name="nom"
          value={nom}
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
          onChange={(e) =>
            setFormData({ ...formData, photo: e.target.files[0] })
          }
        /> 
        <button type="submit">S'inscrire</button>
      </form>
      <button onClick={signInWithGoogle}>Se connecter avec Google </button>
      </div>
 ); }