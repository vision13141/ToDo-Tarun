// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCM4KDWmS_RJGo1h6jF6mO3KBo9Hge63Jk",
  authDomain: "todo-list-e8ce1.firebaseapp.com",
  projectId: "todo-list-e8ce1",
  storageBucket: "todo-list-e8ce1.appspot.com",
  messagingSenderId: "742219833334",
  appId: "1:742219833334:web:beb12ea4d83ff4d6e171d7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const auth = getAuth(app);