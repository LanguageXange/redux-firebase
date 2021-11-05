import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import "./App.css";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import CheckoutPage from "./pages/checkout/checkout.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import Header from "./components/header/header.component";
import { useDispatch, useSelector } from "react-redux";
// selector
//import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "./redux/user/user-selectors";
import { checkUserSession } from "./redux/user/user-actions";

function App() {
  const mycurrentUser = useSelector(selectCurrentUser);
  const mydispatch = useDispatch(); // mydispatch method won't update

  useEffect(() => {
    mydispatch(checkUserSession());
  }, [mydispatch]);

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
            mycurrentUser ? <Redirect to="/" /> : <SignInAndSignUpPage />
          }
        />
      </Switch>
    </div>
  );
}

// const getStuffFromStore = createStructuredSelector({
//   // now we have access to curUser prop in App.js
//   curUser: selectCurrentUser,
// });

// const mapDispatchToProps = (dispatch) => ({
//   checkuser: () => dispatch(checkUserSession()),
// });

export default App;
