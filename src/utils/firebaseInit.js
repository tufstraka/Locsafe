import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
//import { getPerformance } from "firebase/performance";
//import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "locsafe-58643.firebaseapp.com",
  projectId: "locsafe-58643",
  storageBucket: "locsafe-58643.appspot.com",
  messagingSenderId: "835879978368",
  appId: "1:835879978368:web:b7dba7483383b1a9dd2d65",
  measurementId: "G-LQW25CDWKT"
};

const app = initializeApp(firebaseConfig);

//export const perf = getPerformance(app);

export const db = getFirestore(app);