import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cartItems, removeFromCart, totalPrice, totalItems } = useCart();

  if (cartItems.length === 0) {
    return (

      <motion.main
        className="cart-page empty"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2>Your Cart is Empty</h2>
        <p>Looks like you haven't added anything yet.</p>
        <Link to="/" className="continue-shopping-btn">
          Continue Shopping
        </Link>
      </motion.main>
    );
  }

  return (
    <main className="cart-page">
      <h2>Your Cart ({totalItems} items)</h2>

      <div className="cart-layout">
        <div className="cart-items-list">

          <AnimatePresence>
            {cartItems.map((item) => {
              const cleanImage = (item.images[0] || '').replace(/^\["|"\]$/g, '');

              return (

                <motion.div
                  key={item.id}
                  className="cart-item"
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, x: -50, transition: { duration: 0.2 } }}
                >
                  <img src={cleanImage || 'https://via.placeholder.com/150'} alt={item.title} />

                  <div className="cart-item-details">
                    <h3>{item.title}</h3>
                    <p className="item-price">${item.price} x {item.quantity}</p>
                  </div>

                  <div className="cart-item-actions">
                    <p className="item-total">${item.price * item.quantity}</p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="remove-btn"
                    >
                      Remove
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>


        <div className="cart-summary">

          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${totalPrice}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="summary-total">
            <span>Total</span>
            <span>${totalPrice}</span>
          </div>
          <button className="checkout-btn" onClick={() => alert('Checkout!')}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </main>
  );
}