import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCCSDOm5tWTksA6BK2Jk-KXmMKThPwkhHk",
  authDomain: "mumbai-university-chatbot.firebaseapp.com",
  projectId: "mumbai-university-chatbot",
  storageBucket: "mumbai-university-chatbot.appspot.com",
  messagingSenderId: "817203013803",
  appId: "1:817203013803:web:bf489d323f88582df1efee",
  measurementId: "G-KK7R0JS7KD"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
