import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const AskForMoney = ({ price }) => {
  const cents = price * 100;
  const publishKey = process.env.REACT_APP_API_KEY;

  const onToken = (token) => {
    // console.log(token);
    axios({
      url: "payment", // we set up route in server.js,
      method: "post",
      data: {
        amount: cents,
        token: token,
      },
    })
      .then((res) => {
        // console.log(res, "what is res from stripe");
        alert("payment successful!");
      })
      .catch((err) => console.log("payment err", JSON.parse(err)));
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
