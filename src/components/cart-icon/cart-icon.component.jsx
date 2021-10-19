import React from "react";
import { connect } from "react-redux";

import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { toggleCartMenu } from "../../redux/cart/cart-actions";
// using selector
import { selectCartCounts } from "../../redux/cart/cart-selectors";
import { createStructuredSelector } from "reselect";

import "./cart-icon.styles.scss";

const CartIcon = (props) => {
  //console.log(props, "what is props in CartIcon");
  return (
    <div className="cart-icon" onClick={props.hiddenCart}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{props.totalItems}</span>
    </div>
  );
};

// this is a selector - we only need a slice of the state
// caveat - when reducer updates - return a new object - redux rebuilds the entire state object
// mapStateToProps is called every time  and the cart icon component re-renders everytime
// state is a brand new object
// const getStuffFromStore = (state) => ({
//   totalItems: selectCartCounts(state),
// });
// the same as
const getStuffFromStore = createStructuredSelector({
  totalItems: selectCartCounts,
});

//it is a convention to simply name the field key the same name as the action creator:
// but here I name it differently to see what's actually passing in
const getActionFromStore = (dispatch) => ({
  hiddenCart: () => dispatch(toggleCartMenu()),
});

export default connect(getStuffFromStore, getActionFromStore)(CartIcon);
