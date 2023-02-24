import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAsvch0pt8H165dcfe0desyouqY1f1UPrQ",
  authDomain: "moonlight-abdb2.firebaseapp.com",
  projectId: "moonlight-abdb2",
  storageBucket: "moonlight-abdb2.appspot.com",
  messagingSenderId: "550347053443",
  appId: "1:550347053443:web:e636f2846ed530125afeb6"
};

const app = initializeApp(firebaseConfig)
const auth = getAuth()
const db = getFirestore(app)

export {auth, db} 