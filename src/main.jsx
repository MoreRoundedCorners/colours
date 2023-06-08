import { Provider } from "react-redux";
import App from "./App";
import ReactDOM from "react-dom/client";
import store from "./redux/store";
import React from "react";
import "tailwindcss/tailwind.css";
import "./index.css";

const root = document.getElementById("root");

if (!root) throw new Error("No root element found");

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
