import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import {
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
} from "firebase/firestore";

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
  try {
    if (!userAuth) return;
    const docRef = doc(fireStore, "myusers", userAuth.uid); // or doc(fireStore, path)
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

// temporary util function to move data to firebase
// collectionRef.doc() -> there is no doc() function
export const addCollectionAndDocument = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(fireStore, collectionKey);
  const batch = writeBatch(fireStore);
  objectsToAdd.forEach((obj) => {
    // Uncaught (in promise) FirebaseError: Function addDoc() called with invalid data. Data must be an object,
    // const newDocRef = await addDoc(collectionRef); --> this is wrong
    const newDocRef = doc(collectionRef); // auto generate id
    batch.set(newDocRef, obj);
  });
  return await batch.commit();
};

// error - collectionSnapshop.map is not a function
// need to do collectionSnapshot.docs.map
export const convertCollectionsSnapshotToMap = (collectionSnapshot) => {
  const transformCollections = collectionSnapshot.docs.map((doc) => {
    const { title, items } = doc.data();
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });

  return transformCollections.reduce((acc, current) => {
    acc[current.title.toLowerCase()] = current;
    return acc;
  }, {});
};

// helper function because onAuthStateChange is using observer pattern

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(user);
      } else {
        reject();
      }
    });
    unsubscribe();
  });
};
