// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCI4dqEFpPtugKQpwSh5KenOe_b3tmBD4U",
  authDomain: "student-result-managemen-168c1.firebaseapp.com",
  databaseURL: "https://student-result-managemen-168c1-default-rtdb.firebaseio.com",
  projectId: "student-result-managemen-168c1",
  storageBucket: "student-result-managemen-168c1.appspot.com",
  messagingSenderId: "1079715349892",
  appId: "1:1079715349892:web:367e03cb353c78374549d1",
  measurementId: "G-4XB5E9QP6X"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);