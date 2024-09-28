import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  sendEmailVerification,
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD340QqCZTb82NDCvElX22KgP5Rhu9jWDk",
  authDomain: "cohor-resume-builder.firebaseapp.com",
  projectId: "cohor-resume-builder",
  storageBucket: "cohor-resume-builder.appspot.com",
  messagingSenderId: "1094493344472",
  appId: "1:1094493344472:web:31ba18d98a827b4c013dad",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, sendEmailVerification };
