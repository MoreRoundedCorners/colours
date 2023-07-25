import express from "express";
import { Stripe } from "stripe";
import bodyParser from "body-parser";
import cors from "cors";

const port = process.env.PORT || 5000;

const stripe = new Stripe(process.env.REACT_APP_STRIPE_KEY, {
  apiVersion: "2020-08-27",
});

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.post("/charge", async (req, res) => {
  console.log("req.body: ", req.body);
  try {
    let { status } = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "usd",
      description: "Clothing",
      payment_method: req.body.id,
      confirm: true,
    });

    console.log("status: ", status);

    res.json({
      status,
      message: "Payment successful",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Payment failed",
      success: false,
    });
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
