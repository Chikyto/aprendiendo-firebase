import { initializeApp } from "firebase/app";

import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDLZ2gR82zyG7hzoPf8rQRYNButqMAdwxE",
  authDomain: "aprendiendo-249ec.firebaseapp.com",
  projectId: "aprendiendo-249ec",
  storageBucket: "aprendiendo-249ec.appspot.com",
  messagingSenderId: "953733022077",
  appId: "1:953733022077:web:82f617cd929fa0f1d10c14",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
