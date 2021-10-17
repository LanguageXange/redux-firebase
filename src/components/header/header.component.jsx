import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/crown.svg";
import { auth } from "../../firebase/firebase.utils";

import "./header.styles.scss";

const Header = (myprops) => {
  const { user } = myprops;
  // console.log(myprops, "what is myprops");
  return (
    <div className="header">
      <Link className="logo-container" to="/">
        <Logo className="logo" />
      </Link>
      <div className="options">
        <Link className="option" to="/shop">
          SHOP
        </Link>
        <Link className="option" to="/shop">
          CONTACT
        </Link>
        {user ? (
          <div className="option" onClick={() => auth.signOut()}>
            SIGN OUT
          </div>
        ) : (
          <Link className="option" to="/signin">
            SIGN IN
          </Link>
        )}

        {user ? (
          <div>Hello {user.displayName}</div>
        ) : (
          <div>please sign in!</div>
        )}
      </div>
    </div>
  );
};

// mapStateToProps is the naming convention
// state here is the state constructed by rootReducer
// currentUser is the initial state set in userReducer
const getStuffFromStore = (state) => ({
  testing: state.dummy,
  user: state.user.currentUser,
});
export default connect(getStuffFromStore)(Header);
