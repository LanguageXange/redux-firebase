import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import Header from "./components/header/header.component";
// firebase stuff
import { auth, createUserReference } from "./firebase/firebase.utils";
import { onAuthStateChanged } from "firebase/auth";
//import { doc, getDoc, setDoc, collection, getDocs } from "firebase/firestore";
function App() {
  const [myuser, setMyUser] = useState(null);
  // how to use unsubscribe
  // version 9 firebase
  // how to set my user with async await and version 9 firebase inside useEffect
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // user session authentication persistence - we get this out of the box

      if (user) {
        createUserReference(user); // how to await in useEffect
        // the problem we need to await the createUserreference to get the displayName
        setMyUser(user);
      } else {
        console.log("user not sign in");
      }
    });

    return unsubscribe(); // can I write this as a clean up function? -> read the document / ask Yihua
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
