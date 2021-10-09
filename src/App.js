import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import Header from "./components/header/header.component";
import { auth } from "./firebase/firebase.utils";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [myuser, setMyUser] = useState(null);

  // Not sure how to do it to unsubscribe from auth ?
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // user session authentication persistence - we get this out of the box
      if (user) {
        setMyUser(user.displayName);
        console.log(user);
      } else {
        console.log("user not sign in");
      }
    });

    return unsubscribe();
  });

  return (
    <div>
      <Header />
      {myuser ? <div>Hello {myuser}</div> : <div>please sign in!</div>}

      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
        <Route path="/signin" component={SignInAndSignUpPage} />
      </Switch>
    </div>
  );
}

export default App;
