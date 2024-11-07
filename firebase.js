import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBGomrY3dHpgV7UwJrURpM0-6XHH2e2pBM",
    authDomain: "capstone-be62c.firebaseapp.com",
    projectId: "capstone-be62c",
    storageBucket: "capstone-be62c.firebasestorage.app",
    messagingSenderId: "422757467363",
    appId: "1:422757467363:web:92450c4e740e0a9fbcf1d6",
    measurementId: "G-591L2BCPGB"
  };

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();
export { db };
