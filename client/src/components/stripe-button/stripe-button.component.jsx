import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
require("dotenv").config();
const AskForMoney = ({ price }) => {
  const cents = price * 100;
  const publishKey = process.env.REACT_APP_API_KEY;
  // "pk_test_51HObQCAc2iO9zPu9mnoDnYTkUCa1Xw6uGgZ1tB0475zapDTyrElEQu1LUzutSL2DcDszFlwX0ZgdqM4VSec0trL900Zm1LQfQV";

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
