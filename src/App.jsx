import { useState } from "react";
import "./App.css";
import FrontPage from "./components/FrontPage";
import { NextUIProvider } from "@nextui-org/react";
import { Nav } from "./components/Navbar";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Shop from "./components/Shop";
import { EachClothe } from "./components/EachClothe";
import { Blog } from "./components/Blog";
import Cart from "./components/Cart";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/eachClothe" element={<EachClothe />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
