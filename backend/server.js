const express = require("express");
const stripe = require("stripe")("your_stripe_secret_key");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/charge", async (req, res) => {
  try {
    let { status } = await stripe.charges.create({
      amount: req.body.amount,
      currency: "usd",
      description: "An example charge",
      source: req.body.token,
    });

    res.json({ status });
  } catch (err) {
    res.status(500).end();
  }
});

app.listen(5000, () => console.log("Listening on port 8080"));
