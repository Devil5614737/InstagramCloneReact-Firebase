
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";



const firebaseConfig = {
  apiKey: "AIzaSyAxII668UbtgFZQl4GsgRby25O8dFV4iCk",
  authDomain: "instagram-clone-f5b3e.firebaseapp.com",
  projectId: "instagram-clone-f5b3e",
  storageBucket: "instagram-clone-f5b3e.appspot.com",
  messagingSenderId: "44341579393",
  appId: "1:44341579393:web:4fcbe828339707123d4780"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage();