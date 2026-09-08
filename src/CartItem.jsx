import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeItem, updateQuantity } from "./CartSlice";
import "./App.css";

function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart.items);

  // Calculate total cost of all items in cart
  const calculateTotalAmount = () => {
    let total = 0;

    cart.forEach((item) => {
      const quantity = item.quantity;

      const cost =
        typeof item.cost === "string"
          ? parseFloat(item.cost.substring(1))
          : parseFloat(item.cost);

      total += quantity * cost;
    });

    return total;
  };

  // Calculate total number of plants
  const calculateTotalQuantity = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Calculate subtotal for one item
  const calculateTotalCost = (item) => {
    const cost =
      typeof item.cost === "string"
        ? parseFloat(item.cost.substring(1))
        : parseFloat(item.cost);

    return cost * item.quantity;
  };

  // Continue shopping
  const handleContinueShopping = (e) => {
    if (onContinueShopping) {
      onContinueShopping(e);
    }
  };

  // Checkout button
  const handleCheckoutShopping = () => {
    alert("Functionality to be added for future reference");
  };

  // Increase quantity
  const handleIncrement = (item) => {
    dispatch(
      updateQuantity({
        name: item.name,
        quantity: item.quantity + 1,
      })
    );
  };

  // Decrease quantity
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({
          name: item.name,
          quantity: item.quantity - 1,
        })
      );
    } else {
      dispatch(removeItem(item.name));
    }
  };

  // Delete item
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const totalItems = calculateTotalQuantity();

  return (
    <>
      {/* Header */}
      <nav className="navbar">
        <div className="navbar-brand">
          <h2>Paradise Nursery</h2>
        </div>

        <div className="navbar-links">
          <Link to="/">Home</Link>

          <Link to="/products">Plants</Link>

          <Link to="/cart" className="cart-link">
            🛒 Cart ({totalItems})
          </Link>
        </div>
      </nav>

      {/* Cart Page */}
      <div className="cart-page">
        <h1>Shopping Cart</h1>

        {/* Cart Summary */}
        <div className="cart-summary">
          <h2>Total number of plants: {totalItems}</h2>

          <h2>
            Total cost: ${calculateTotalAmount().toFixed(2)}
          </h2>
        </div>

        {/* Empty Cart */}
        {cart.length === 0 ? (
          <div className="empty-cart">
            <p>Your shopping cart is empty.</p>
          </div>
        ) : (
          <div className="cart-items">
            {cart.map((item, index) => (
              <div
                className="cart-item"
                key={item.name || index}
              >
                {/* Plant Image */}
                <img
                  className="cart-item-image"
                  src={item.image}
                  alt={item.name}
                />

                {/* Plant Details */}
                <div className="cart-item-details">
                  <h3>{item.name}</h3>

                  <p>
                    Unit Price:{" "}
                    {typeof item.cost === "string"
                      ? item.cost
                      : `$${Number(item.cost).toFixed(2)}`}
                  </p>

                  <p>
                    Quantity: {item.quantity}
                  </p>

                  <p>
                    Item Total: $
                    {calculateTotalCost(item).toFixed(2)}
                  </p>

                  {/* Quantity Buttons */}
                  <div className="cart-item-buttons">
                    <button
                      onClick={() =>
                        handleIncrement(item)
                      }
                    >
                      +
                    </button>

                    <button
                      onClick={() =>
                        handleDecrement(item)
                      }
                    >
                      -
                    </button>

                    <button
                      className="delete-button"
                      onClick={() =>
                        handleRemove(item)
                      }
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Buttons */}
        <div className="cart-actions">
          <Link to="/products">
            <button
              className="continue-shopping-button"
              onClick={handleContinueShopping}
            >
              Continue Shopping
            </button>
          </Link>

          <button
            className="checkout-button"
            onClick={handleCheckoutShopping}
          >
            Checkout
          </button>
        </div>
      </div>
    </>
  );
}

export default CartItem;