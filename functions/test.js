exports.handler = async (event) => {
  console.log("hello this is test");
};

// const express = require("express");
// const cors = require("cors");
// const serverless = require("serverless-http");
// const path = require("path");

// if (process.env.NODE_ENV !== "production") require("dotenv").config();

// // use the stripe
// // with Netlify function, will I still have access to the .env?
// // need to do it in Netlify dashboard
// const stripe = require("stripe")(process.env.MY_STRIPE_SECRET_KEY);

// const app = express();
// const port = process.env.PORT || 5000;

// // with express version 4.16+ we don't need bodyParser
// app.use(express.json());
// app.use(express.urlencoded());
// app.use(cors());

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "client/build")));

//   // any route
//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "client/build", "index.html"));
//   });
// }

// app.listen(port, (err) => console.log("error", err));

// app.post("/payment", (req, res) => {
//   const body = {
//     source: req.body.token.id,
//     amount: req.body.amount,
//     currency: "usd",
//   };

//   stripe.charges.create(body, (stripeErr, stripeRes) => {
//     if (stripeErr) {
//       res.status(500).send({ error: stripeErr });
//     } else {
//       res.status(200).send({ success: stripeRes });
//     }
//   });
// });

// module.exports.handler = serverless(app);
