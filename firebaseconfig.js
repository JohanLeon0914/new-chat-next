// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6fWnyE3lQS_lfC-dglTMoMOvlfFYtTEk",
  authDomain: "boomerland-chat-b078d.firebaseapp.com",
  projectId: "boomerland-chat-b078d",
  storageBucket: "boomerland-chat-b078d.appspot.com",
  messagingSenderId: "236655931040",
  appId: "1:236655931040:web:c8505a4b2ad50d7db4e3c5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();


export { auth, db }