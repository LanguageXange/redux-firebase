import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import "./App.css";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import CheckoutPage from "./pages/checkout/checkout.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import Header from "./components/header/header.component";
import { connect } from "react-redux";
// selector
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "./redux/user/user-selectors";
function App({ curUser }) {
  // useEffect(() => {
  //   // onAuthStateChanged is an observer and returns Unsubscribe huh?
  //   const unsub = onAuthStateChanged(auth, async (user) => {
  //     if (user) {
  //       const userRef = await createUserReference(user);
  //       const userSnapshot = await getDoc(userRef);
  //       setCurUser(userSnapshot.data());
  //     } else {
  //       setCurUser(null);
  //       console.log("user not sign in");
  //     }
  //   });

  //   return () => unsub(); // clean up function
  // }, [setCurUser]);
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

export default connect(getStuffFromStore)(App);
