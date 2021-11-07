const express = require("express");

const serverless = require("serverless-http");

const app = express();
const router = express.Router();
router.get("/name", (req, res) => {
  res.json({
    path: "name",
    name: "bobby",
  });
});

router.get("/", (req, res) => {
  res.json({
    path: "home",
    name: "Amy",
  });
});

app.use("/", router);

module.exports.handler = serverless(app);
