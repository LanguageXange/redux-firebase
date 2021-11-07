const express = require("express");
const cors = require("cors");
const serverless = require("serverless-http");
const path = require("path");

// use the stripe
const stripe = require("stripe")(process.env.MY_STRIPE_SECRET_KEY);

const app = express();
const router = express.Router();

//with express version 4.16+ we don't need bodyParser
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  // any route
  router.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

router.post("/payment", (req, res) => {
  const body = {
    source: req.body.token.id,
    amount: req.body.amount,
    currency: "usd",
  };

  stripe.charges.create(body, (stripeErr, stripeRes) => {
    if (stripeErr) {
      res.status(500).send({ error: stripeErr });
    } else {
      res.status(200).send({ success: stripeRes });
    }
  });
});

router.get("/", (req, res) => {
  res.json({
    path: "home",
    name: "Amy",
  });
});

router.get("/blah", (req, res) => {
  res.json({
    path: "blalh",
    name: "Booom",
  });
});

router.get("/payment", (req, res) => {
  res.json({
    path: "payment",
    name: "charge",
  });
});

app.use("/", router);

module.exports.handler = serverless(app);
