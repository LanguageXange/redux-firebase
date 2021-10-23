import React from "react";
import StripeCheckout from "react-stripe-checkout";

const AskForMoney = ({ price }) => {
  const cents = price * 100;
  const publishKey =
    "pk_test_51HObQCAc2iO9zPu9mnoDnYTkUCa1Xw6uGgZ1tB0475zapDTyrElEQu1LUzutSL2DcDszFlwX0ZgdqM4VSec0trL900Zm1LQfQV";

  const onToken = (token) => {
    console.log(token);
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
