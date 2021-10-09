import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDSnXEqSj5PM90LUEc5OrGDV4PO-zlFG6U",
  authDomain: "dev-shop-28a41.firebaseapp.com",
  projectId: "dev-shop-28a41",
  storageBucket: "dev-shop-28a41.appspot.com",
  messagingSenderId: "20315246550",
  appId: "1:20315246550:web:d498fc7c1ead9884379e77",
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const provider = new GoogleAuthProvider();

// documentation link
// https://developers.google.com/identity/protocols/oauth2/openid-connect#authenticationuriparameters
provider.setCustomParameters({
  login_hint: "user@example.com",
  prompt: "select_account",
});

export const auth = getAuth();
// link
// https://firebase.google.com/docs/firestore/quickstart
export const fireStore = getFirestore();

// make it a function so that signinWithPopup won't be called right away
export const signInWithGoogle = () =>
  signInWithPopup(auth, provider).then((result) => console.log(result));
