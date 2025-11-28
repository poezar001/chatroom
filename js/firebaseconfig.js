// use version 12.4.0 everywhere
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";


const firebaseConfig = {
  apiKey: "AIzaSyDUxDWgt4fQTeTRsrqsouKP0yUbk8BKDiQ",
  authDomain: "es6-b2-project.firebaseapp.com",
  projectId: "es6-b2-project",
  storageBucket: "es6-b2-project.firebasestorage.app",
  messagingSenderId: "547281511793",
  appId: "1:547281511793:web:db8ab68229121f1c3702d0"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
