// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore/lite"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyGgY_AgqrxXzkzqjzAyFq5j-3g4-hwTo",
  authDomain: "react-cursos-b22e7.firebaseapp.com",
  projectId: "react-cursos-b22e7",
  storageBucket: "react-cursos-b22e7.appspot.com",
  messagingSenderId: "981488670664",
  appId: "1:981488670664:web:8354ecdb503107862ed2fd"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth(FirebaseApp)
export const FirebaseDB = getFirestore(FirebaseApp)