import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYwO6x5TXpy6kg9kRyvVAHi4uz0rvGUmo",
  authDomain: "convo-on-fire.firebaseapp.com",
  projectId: "convo-on-fire",
  storageBucket: "convo-on-fire.appspot.com",
  messagingSenderId: "380612276893",
  appId: "1:380612276893:web:b20ac86b46f4d50ad5da74",
  measurementId: "G-KBMKBKGPQ7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
