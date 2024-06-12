import { initializeApp } from "firebase/app";
 import { getAuth } from "firebase/auth";
 import { getFirestore } from "firebase/firestore";
 
 const firebaseConfig = {
    apiKey: "AIzaSyCYT5od1zAinFFWzq4Wac5tURwJQww-4fc",
    authDomain: "app-maria-886ca.firebaseapp.com",
    projectId: "app-maria-886ca",
    storageBucket: "app-maria-886ca.appspot.com",
    messagingSenderId: "947676050872",
    appId: "1:947676050872:web:30153b10e9675263b44b4d",
    measurementId: "G-43233WNWDS"
  };
const app = initializeApp(firebaseConfig);
 export const auth = getAuth(app);
 export const db = getFirestore(app);
