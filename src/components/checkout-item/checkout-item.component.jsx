import React, { useState } from "react";
import { connect } from "react-redux";
import {
  clearItem,
  decreaseItem,
  increaseItem,
} from "../../redux/cart/cart-actions";

import "./checkout-item.styles.scss";

const CheckoutItem = ({
  cartItem: { id, name, imageUrl, price, quantity },
  dispatch, //  by default connect provides the dispatch props
}) => {
  const [showWarning, setShowWarning] = useState(false);

  return (
    <>
      <div className="checkout-item">
        <div className="image-container">
          <img src={imageUrl} alt="item" />
        </div>
        <span className="name">{name}</span>
        <span className="quantity">
          <div className="arrow" onClick={() => dispatch(decreaseItem(id))}>
            &#10094;
          </div>
          <span className="value">{quantity}</span>
          <div className="arrow" onClick={() => dispatch(increaseItem(id))}>
            &#10095;
          </div>
        </span>
        <span className="price">{price}</span>
        <div className="remove-button" onClick={() => setShowWarning(true)}>
          &#10005;
        </div>
      </div>
      {showWarning ? (
        <div id="overlay">
          <div className="warning">
            <h2>Yes, I want to clear the item</h2>

            <div>
              <button
                onClick={() => {
                  dispatch(clearItem(id));
                  setShowWarning(false);
                }}
              >
                Delete Item
              </button>
              <button onClick={() => setShowWarning(false)}>Cancel X</button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

//  by default connect provides the dispatch props
export default connect()(CheckoutItem);
