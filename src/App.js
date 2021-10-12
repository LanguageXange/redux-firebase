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
import { getDoc } from "@firebase/firestore";
//import { doc, getDoc, setDoc, collection, getDocs } from "firebase/firestore";
// INTEGRATE WITH TYPESCRIPT
// interface / union types are most common
function App() {
  const [myuser, setMyUser] = useState();
  // class component comparison - https://github.com/ZhangMYihua/lesson-10/blob/master/src/App.js
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      // user session authentication persistence - we get this out of the box
      if (user) {
        const userRef = await createUserReference(user);
        const userSnapshot = await getDoc(userRef);
        setMyUser(userSnapshot.data());
      } else {
        setMyUser(null); // so that when you click sign out (header component) no need to refresh to see the changes
        console.log("user not sign in");
      }
    });

    return () => unsubscribe(); // clean up function
  }, []);

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
