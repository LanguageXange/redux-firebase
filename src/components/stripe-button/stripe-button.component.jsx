import React from "react";
import StripeCheckout from "react-stripe-checkout";

const AskForMoney = ({ price }) => {
  const cents = price * 100;
  const publishKey = process.env.REACT_APP_API_KEY;

  const onToken = (token) => {
    // console.log(token);
    alert("success!");
  };

  return (
    <StripeCheckout
      label="Get Stuff"
      name="Dev Shop"
      // billingAddress
      // shippingAddress
      description={`Your total is $ ${price}`}
      amount={cents}
      token={onToken}
      stripeKey={publishKey}
    />
  );
};
export default AskForMoney;
