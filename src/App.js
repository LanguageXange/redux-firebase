import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import "./App.css";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import CheckoutPage from "./pages/checkout/checkout.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import Header from "./components/header/header.component";
// firebase stuff
import { auth, createUserReference } from "./firebase/firebase.utils";
import { onAuthStateChanged } from "firebase/auth";
import { getDoc } from "@firebase/firestore";
import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/user-actions";
// selector
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "./redux/user/user-selectors";
function App({ setCurUser, curUser }) {
  useEffect(() => {
    // onAuthStateChanged is an observer and returns an unsubscribe function
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = await createUserReference(user);
        const userSnapshot = await getDoc(userRef);
        setCurUser(userSnapshot.data());
      } else {
        setCurUser(null);
        console.log("user not sign in");
      }
    });
  }, [setCurUser]);

  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
        <Route exact path="/checkout" component={CheckoutPage} />
        <Route
          exact
          path="/signin"
          render={() =>
            curUser ? <Redirect to="/" /> : <SignInAndSignUpPage />
          }
        />
      </Switch>
    </div>
  );
}

const getStuffFromStore = createStructuredSelector({
  // now we have access to curUser prop in App.js
  curUser: selectCurrentUser,
});

// return an object
const getActionsFromStore = (mydispatch) => ({
  // now we have access to setCurUser
  setCurUser: (user) => mydispatch(setCurrentUser(user)),
});

export default connect(getStuffFromStore, getActionsFromStore)(App);
