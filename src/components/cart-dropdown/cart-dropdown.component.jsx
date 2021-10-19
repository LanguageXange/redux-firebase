import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { createStructuredSelector } from "reselect";
import { selectCartItems } from "../../redux/cart/cart-selectors";
import CartItem from "../cart-item/cart-item.component";

import CustomButton from "../custom-button/custom-button.component";

import "./cart-dropdown.styles.scss";

const CartDropdown = ({ cartItems, history }) => {
  console.log("I am called");
  return (
    <div className="cart-dropdown">
      <div className="cart-items">
        {cartItems.length ? (
          cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} item={cartItem} />
          ))
        ) : (
          <span className="empty-message">Your cart is empty</span>
        )}
      </div>

      <CustomButton
        onClick={() => {
          history.push("/checkout");
        }}
      >
        GO TO CHECKOUT
      </CustomButton>
    </div>
  );
};

const getStuffFromStore = createStructuredSelector({
  cartItems: selectCartItems,
});

export default withRouter(connect(getStuffFromStore, null)(CartDropdown));
