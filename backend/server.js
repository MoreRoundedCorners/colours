import express from "express";
import { Stripe } from "stripe";
import bodyParser from "body-parser";
import cors from "cors";

const stripe = new Stripe(
  "pk_test_51NXThFCoFFtVdwpNDdfq9ybuHAKWw84Co5QdCw8WXnSiiUyuZGtEGFZpVKtoQTINasC754585O5YsNkgbmS2okf800vjc5ZH4h",
  {
    apiVersion: "2020-08-27",
  }
);

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/charge", async (req, res) => {
  console.log("req.body: ", req.body);
  try {
    let { status } = await stripe.PaymentIntents.create({
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
    res.json({
      message: "Payment failed",
      success: false,
    });
  }
});

app.listen(5000, () => console.log("Listening on port 5000"));
