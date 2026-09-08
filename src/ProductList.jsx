import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addItem } from "./CartSlice";
import "./App.css";
import snakePlant from "./assets/snake-plant.jpg";
import peaceLily from "./assets/peace-lily.jpg";
import zzPlant from "./assets/zz-plant.jpg";
import aloeVera from "./assets/aloe-vera.jpg";
import monstera from "./assets/monstera.jpg";
import birdOfParadise from "./assets/bird-of-paradise.jpg";

const plantsArray = [
  {
    category: "Air Purifying Plants",
    plants: [
      {
        id: 1,
        name: "Snake Plant",
        image: snakePlant,
        description:
          "A hardy indoor plant known for improving air quality and requiring very little maintenance.",
        cost: "$15.00",
      },
      {
        id: 2,
        name: "Peace Lily",
        image: peaceLily,
        description:
          "A beautiful flowering plant that helps improve indoor air quality.",
        cost: "$20.00",
      },
    ],
  },

  {
    category: "Low Maintenance Plants",
    plants: [
      {
        id: 3,
        name: "ZZ Plant",
        image: zzPlant,
        description:
          "A durable houseplant that grows well in low light and requires little care.",
        cost: "$18.00",
      },
      {
        id: 4,
        name: "Aloe Vera",
        image: aloeVera,
        description:
          "A popular succulent that requires minimal watering and maintenance.",
        cost: "$14.00",
      },
    ],
  },

  {
    category: "Tropical Plants",
    plants: [
      {
        id: 5,
        name: "Monstera",
        image: monstera,
        description:
          "A tropical houseplant famous for its large and decorative split leaves.",
        cost: "$30.00",
      },
      {
        id: 6,
        name: "Bird of Paradise",
        image: birdOfParadise,
        description:
          "A striking tropical plant with large green leaves and a bold appearance.",
        cost: "$35.00",
      },
    ],
  },
];

function ProductList() {
  const dispatch = useDispatch();

  // Get cart items from Redux store
  const CartItems = useSelector((state) => state.cart.items);

  // Track which products have already been added
  const [addedToCart, setAddedToCart] = useState({});

  // Add plant to Redux cart
  const handleAddToCart = (product) => {
    dispatch(addItem(product));

    setAddedToCart((prevState) => ({
      ...prevState,
      [product.name]: true,
    }));
  };

  // Calculate total number of plants currently in cart
  const calculateTotalQuantity = () => {
    return CartItems
      ? CartItems.reduce(
          (total, item) => total + item.quantity,
          0
        )
      : 0;
  };

  return (
    <>
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-brand">
          <h2>Paradise Nursery</h2>
        </div>

        <div className="navbar-links">
          <Link to="/">Home</Link>

          <Link to="/products">Plants</Link>

          <Link to="/cart" className="cart-link">
            🛒 Cart ({calculateTotalQuantity()})
          </Link>
        </div>
      </nav>

      {/* Product Listing Page */}
      <div className="product-page">
        <h1 className="page-title">
          Our Houseplants
        </h1>

        <p className="page-description">
          Explore our collection of beautiful houseplants and choose the
          perfect plants for your home.
        </p>

        <div className="product-grid">
          {plantsArray.map((category, index) => (
            <div
              className="category-section"
              key={index}
            >
              <h1 className="category-title">
                <div>{category.category}</div>
              </h1>

              <div className="product-list">
                {category.plants.map(
                  (plant, plantIndex) => (
                    <div
                      className="product-card"
                      key={plant.id || plantIndex}
                    >
                      <img
                        className="product-image"
                        src={plant.image}
                        alt={plant.name}
                      />

                      <div className="product-title">
                        {plant.name}
                      </div>

                      <div className="product-description">
                        {plant.description}
                      </div>

                      <div className="product-cost">
                        {plant.cost}
                      </div>

                      <button
                        className="product-button"
                        onClick={() =>
                          handleAddToCart(plant)
                        }
                        disabled={
                          addedToCart[plant.name]
                        }
                      >
                        {addedToCart[plant.name]
                          ? "Added to Cart"
                          : "Add to Cart"}
                      </button>
                    </div>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ProductList;