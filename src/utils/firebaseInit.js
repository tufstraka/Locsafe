import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that I want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: import.meta.env.FIREBASE_API_KEY,
  authDomain: "locsafe-58643.firebaseapp.com",
  projectId: "locsafe-58643",
  storageBucket: "locsafe-58643.appspot.com",
  messagingSenderId: "835879978368",
  appId: "1:835879978368:web:b7dba7483383b1a9dd2d65",
  measurementId: "G-LQW25CDWKT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const db = getFirestore(app);

//console.log(db)

export default db;
