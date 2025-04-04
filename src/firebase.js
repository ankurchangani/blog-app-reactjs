// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyADlTwbX-KcM8CiRIDNf_HZpmQE0sdanRQ",
  authDomain: "blog-app-9ba64.firebaseapp.com",
  projectId: "blog-app-9ba64",
  storageBucket: "blog-app-9ba64.firebasestorage.app",
  messagingSenderId: "951731757193",
  appId: "1:951731757193:web:f90c616ed5b1d9acb22658",
  measurementId: "G-YQ4PE3HT84"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

export const db = getFirestore(app);

export const auth = getAuth(app);