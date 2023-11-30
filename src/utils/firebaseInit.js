import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getPerformance } from "firebase/performance";
//import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that I want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyAPyF44EBwhUsDx1n4pdgmBIjvWQK_fxMk",
  authDomain: "locsafe-58643.firebaseapp.com",
  projectId: "locsafe-58643",
  storageBucket: "locsafe-58643.appspot.com",
  messagingSenderId: "835879978368",
  appId: "1:835879978368:web:b7dba7483383b1a9dd2d65",
  measurementId: "G-LQW25CDWKT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Performance monitoring
const perf = getPerformance(app);
//const analytics = getAnalytics(app);
const db = getFirestore(app);
//const auth = getAuth(app);


export default db;
