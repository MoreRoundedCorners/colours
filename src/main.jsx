import { Provider } from "react-redux";
import App from "./App";
import ReactDOM from "react-dom/client";
import store from "./redux/store";
import React from "react";
import "tailwindcss/tailwind.css";
import "./index.css";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const root = document.getElementById("root");

const stripePromise = loadStripe(
  "pk_test_51NXThFCoFFtVdwpNDdfq9ybuHAKWw84Co5QdCw8WXnSiiUyuZGtEGFZpVKtoQTINasC754585O5YsNkgbmS2okf800vjc5ZH4h"
);

if (!root) throw new Error("No root element found");

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Provider store={store}>
      <Elements stripe={stripePromise}>
        <App />
      </Elements>
    </Provider>
  </React.StrictMode>
);
