import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/crown.svg";
import { auth } from "../../firebase/firebase.utils";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import "./header.styles.scss";
import { createStructuredSelector } from "reselect";
import { selectCartHidden } from "../../redux/cart/cart-selectors";
import { selectCurrentUser } from "../../redux/user/user-selectors";

const Header = (myprops) => {
  const { user, cartStatus } = myprops;
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
        <CartIcon />
      </div>
      {cartStatus ? null : <CartDropdown />}
    </div>
  );
};

// mapStateToProps is the naming convention
// state here is the state constructed by rootReducer
// currentUser is the initial state set in userReducer
// const getStuffFromStore = (state) => ({
//   testing: state.dummy,
//   user: state.user.currentUser,
//   cartStatus: state.mycart.hidden,
// });

// user selector
// const getStuffFromStore = (state) => ({
//   user: selectCurrentUser(state),
//   cartStatus: selectCartHidden(state),
// });
const getStuffFromStore = createStructuredSelector({
  user: selectCurrentUser,
  cartStatus: selectCartHidden,
});

export default connect(getStuffFromStore)(Header);
