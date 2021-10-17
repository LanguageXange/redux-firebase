import React from "react";
import { connect } from "react-redux";

import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { toggleCartMenu } from "../../redux/cart/cart-actions";

import "./cart-icon.styles.scss";

const CartIcon = (props) => {
  //console.log(props, "what is props in CartIcon");
  return (
    <div className="cart-icon" onClick={props.hiddenCart}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">0</span>
    </div>
  );
};

//it is a convention to simply name the field key the same name as the action creator:
// but here I name it differently to see what's actually passing in
const getActionFromStore = (dispatch) => ({
  hiddenCart: () => dispatch(toggleCartMenu()),
});

export default connect(null, getActionFromStore)(CartIcon);
