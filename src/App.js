import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import Header from "./components/header/header.component";
import { auth, fireStore } from "./firebase/firebase.utils";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
function App() {
  const [myuser, setMyUser] = useState(null);

  const fetchCollection = async () => {
    try {
      const querySnapshot = await getDocs(collection(fireStore, "myusers"));
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log("Fetch myusers collection => ", doc.data());
      });
    } catch (err) {
      console.log(err);
    }
  };
  const fetchdata = async () => {
    try {
      const docRef = doc(fireStore, "myusers", "KmxkD6WeYbxnjmXV9MDE");
      const snapShot = await getDoc(docRef);
      if (snapShot.exists()) {
        console.log(snapShot.data(), " fetch one document");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchdata();
    fetchCollection();
  }, []);

  // Not sure how to do it to unsubscribe from auth ?
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // user session authentication persistence - we get this out of the box
      if (user) {
        setMyUser(user);
      } else {
        console.log("user not sign in");
      }
    });

    return unsubscribe(); // can it write this as a clean up function?
  });

  return (
    <div>
      <Header currentUser={myuser} />

      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
        <Route path="/signin" component={SignInAndSignUpPage} />
      </Switch>
    </div>
  );
}

export default App;
