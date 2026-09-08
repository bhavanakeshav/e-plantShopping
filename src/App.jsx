import React from "react";
import {
  HashRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";

import AboutUs from "./AboutUs";
import ProductList from "./ProductList";
import CartItem from "./CartItem";
import "./App.css";

function Home() {
  return (
    <div className="landing-page">
      <div className="overlay">
        <h1>Paradise Nursery</h1>

        <AboutUs />

        <Link to="/products">
          <button className="get-started-btn">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/products"
          element={<ProductList />}
        />
        <Route
          path="/cart"
          element={<CartItem />}
        />
      </Routes>
    </HashRouter>
  );
}

export default App;