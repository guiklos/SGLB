
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyD0Z2VoTQ8mkA3s3zP2aGPP87edqDV0Fsk",
  authDomain: "sglb-fbbaf.firebaseapp.com",
  projectId: "sglb-fbbaf",
  storageBucket: "sglb-fbbaf.appspot.com",
  messagingSenderId: "951692501027",
  appId: "1:951692501027:web:f52f499e90791c2f1a9196",
  measurementId: "G-T0ML07YYD2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);