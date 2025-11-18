import React from "react";

import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/CartPage";
import About from "./pages/About";
import Support from "./pages/Support";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";

const App = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="product/:id" element={<ProductDetails />} />
      <Route path="cart" element={<CartPage />} />
      <Route path="about" element={<About />} />
      <Route path="support" element={<Support />} />
      <Route path="faq" element={<FAQ />} />
      <Route path="contact" element={<Contact />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
    </Route>
  </Routes>
);

export default App;
