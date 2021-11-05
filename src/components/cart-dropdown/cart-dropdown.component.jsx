import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";

import { selectCartItems } from "../../redux/cart/cart-selectors";
import CartItem from "../cart-item/cart-item.component";
import { toggleCartMenu } from "../../redux/cart/cart-actions";
import CustomButton from "../custom-button/custom-button.component";

import "./cart-dropdown.styles.scss";

const CartDropdown = () => {
  const myCartItems = useSelector(selectCartItems);
  const mydispatch = useDispatch();
  const history = useHistory();

  return (
    <div className="cart-dropdown">
      <div className="cart-items">
        {myCartItems.length ? (
          myCartItems.map((cartItem) => (
            <CartItem key={cartItem.id} item={cartItem} />
          ))
        ) : (
          <span className="empty-message">Your cart is empty</span>
        )}
      </div>

      <CustomButton
        onClick={() => {
          history.push("/checkout");
          mydispatch(toggleCartMenu());
        }}
      >
        GO TO CHECKOUT
      </CustomButton>
    </div>
  );
};

// we are switching to useSelector - we don't need connect from react-redux!
// const getStuffFromStore = createStructuredSelector({
//   cartItems: selectCartItems,
// });

export default CartDropdown;
