import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { doc, getDoc, setDoc, collection, getDocs } from "firebase/firestore";
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
// let's make it async function
// https://blog.logrocket.com/user-authentication-firebase-react-apps/
// https://dev.to/onurbraga/firebase-authentication-using-react-hooks-50j0
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    // The signed-in user info.
    const user = result.user;
    return user.displayName;
    // console.log(user, "what is user for signInWithGoogle function");
  } catch (err) {
    console.log(err);
  }
};

export const createUserReference = async (userAuth, extrainfo) => {
  // remove double try catch blocks - ugly
  try {
    if (!userAuth) return;
    const docRef = doc(fireStore, "myusers", userAuth.uid);
    const snapShot = await getDoc(docRef);
    if (!snapShot.exists()) {
      const { email, displayName } = userAuth;
      const createdAt = new Date();

      await setDoc(docRef, {
        email,
        displayName,
        createdAt,
        ...extrainfo,
      });
    }

    return docRef;
  } catch (err) {
    console.log(err, "errors creating user reference");
  }
};
