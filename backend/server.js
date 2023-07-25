import express from "express";
import { Stripe } from "stripe";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path"; // add this line

const port = process.env.PORT || 5000;

const stripe = new Stripe(process.env.REACT_APP_STRIPE_KEY, {
  apiVersion: "2020-08-27",
});

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// This serves your static files
app.use(express.static(path.resolve(__dirname, "dist")));

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

// This sends your index.html file for any GET request that doesn't match the other routes
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
