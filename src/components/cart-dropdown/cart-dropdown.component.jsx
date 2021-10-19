import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { createStructuredSelector } from "reselect";
import { selectCartItems } from "../../redux/cart/cart-selectors";
import CartItem from "../cart-item/cart-item.component";
import { toggleCartMenu } from "../../redux/cart/cart-actions";
import CustomButton from "../custom-button/custom-button.component";

import "./cart-dropdown.styles.scss";

const CartDropdown = ({ cartItems, history, ...props }) => {
  // console.log(props, "what are the prps");
  // we have access to dispatch by default when we use connect()
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
          props.dispatch(toggleCartMenu());
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

export default withRouter(connect(getStuffFromStore)(CartDropdown));
