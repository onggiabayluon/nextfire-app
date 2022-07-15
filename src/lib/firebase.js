import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAc0ZuCvRy9A0ZCxOH8bv3KZIxY4Lw9FCk",
  authDomain: "nextfire-17c57.firebaseapp.com",
  projectId: "nextfire-17c57",
  storageBucket: "nextfire-17c57.appspot.com",
  messagingSenderId: "1013225098009",
  appId: "1:1013225098009:web:8df6cd3cc414610e41d388",
  measurementId: "G-FMBEBM66DK",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Auth exports
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const firestore = firebase.firestore();

// Storage exports
export const storage = firebase.storage();
