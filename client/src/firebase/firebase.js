import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// Your web app's Firebase configuration
const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
});

export const auth = app.auth();
export const db = app.firestore();
export default app;

//import firebase from "firebase";
//import "firebase/firestore";
//
//// Your web app's Firebase configuration
//var firebaseApp = firebase.initializeApp({
//  apiKey: "AIzaSyBH6Xm70ijhHndhccWb4NIgcK2D3jOkQlQ",
//  authDomain: "jobhunter-e6b93.firebaseapp.com",
//  projectId: "jobhunter-e6b93",
//  storageBucket: "jobhunter-e6b93.appspot.com",
//  messagingSenderId: "976780275258",
//  appId: "1:976780275258:web:822330052669a67e740f03",
//});
//
//let db = firebaseApp.firestore();
//export { db };
