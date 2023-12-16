import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDZYwP6zO2DRQmvLbv_MVqQyYGrqkzh3TA",
    authDomain: "saylani-final-hackathon-38b23.firebaseapp.com",
    projectId: "saylani-final-hackathon-38b23",
    storageBucket: "saylani-final-hackathon-38b23.appspot.com",
    messagingSenderId: "568060057257",
    appId: "1:568060057257:web:bb64455a15270517237bb8"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, createUserWithEmailAndPassword, db, doc, setDoc, signInWithEmailAndPassword }
