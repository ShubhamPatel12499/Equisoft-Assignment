import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore'
import {createUserWithEmailAndPassword,signInWithEmailAndPassword, getAuth, signOut, sendPasswordResetEmail} from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyBD8g--qGqCFK52yKwyWD3nrIZhfvUDko4",
    authDomain: "equisoft-c8b72.firebaseapp.com",
    projectId: "equisoft-c8b72",
    storageBucket: "equisoft-c8b72.appspot.com",
    messagingSenderId: "639699941841",
    appId: "1:639699941841:web:012137e0335c70e59588f0",
    measurementId: "G-LKHZBDHB1K"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

const analytics = getAnalytics(app);
const auth = getAuth()

export const signup=(email,password)=>{
    return createUserWithEmailAndPassword(auth,email,password)
}

export const login=(email,password)=>{
    return signInWithEmailAndPassword
    (auth,email,password)
}

export const resetpassword=(email)=>{
    return sendPasswordResetEmail(auth,email)
}

export const logout=()=>{
    return signOut(auth)
}


export default firebaseConfig;

