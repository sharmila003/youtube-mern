import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDvhAzKANICokSf1LgAqXEfeJWYDXRyPf8",
    authDomain: "fir-8bd99.firebaseapp.com",
    projectId: "fir-8bd99",
    storageBucket: "fir-8bd99.appspot.com",
    messagingSenderId: "31217125479",
    appId: "1:31217125479:web:1a2b620a73374948a5ecc2"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, app };


