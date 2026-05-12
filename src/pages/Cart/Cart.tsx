import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { CheckCircle } from '@phosphor-icons/react';
import styles from './Cart.module.css';

export default function Cart() {
  const { cartItems, removeFromCart, clearCart, totalPrice, totalItems } = useCart();
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate(); 

  const handleCheckout = () => {
    setIsSuccess(true);
    clearCart();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isSuccess) {
    return (
      <motion.main
        className={`${styles.cartPage} ${styles.empty}`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
        >
          <CheckCircle 
            size={72} 
            weight="fill" 
            color="#7FA36B" 
            style={{ marginBottom: '1.5rem' }} 
          />
        </motion.div>

        <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Order Confirmed.</h2>
        <p style={{ color: '#666', marginBottom: '2rem' }}>
          Thank you for your purchase. Your ledger has been updated.
        </p>
        <Link 
          to="/" 
          className={styles.continueShoppingBtn}
          onClick={() => setIsSuccess(false)}
        >
          &larr; Return to catalogue
        </Link>
      </motion.main>
    );
  }

  if (cartItems.length === 0) {
    return (
      <motion.main
        className={`${styles.cartPage} ${styles.empty}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2>Your Cart is Empty</h2>
        <p>Looks like you haven't added anything yet.</p>
        <Link to="/" className={styles.continueShoppingBtn}>
          Continue Shopping
        </Link>
      </motion.main>
    );
  }

  return (
    <main className={styles.cartPage}>
      <button
        onClick={() => navigate(-1)}
        className={styles.backLink}
      >
        &larr; Back to products
      </button>

      <h2>Shopping Cart ({totalItems} items)</h2>

      <div className={styles.cartLayout}>
        <div className={styles.cartItemsList}>
          <AnimatePresence>
            {cartItems.map((item) => {
              const cleanImage = (item.images[0] || '').replace(/^\["|"\]$/g, '');

              return (
                <motion.div
                  key={item.id}
                  className={styles.cartItem}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, x: -50, transition: { duration: 0.2 } }}
                >
                  <img src={cleanImage || 'https://via.placeholder.com/150'} alt={item.title} />

                  <div className={styles.cartItemDetails}>
                    <h3>{item.title}</h3>
                    <p className={styles.itemPrice}>${item.price} x {item.quantity}</p>
                  </div>

                  <div className={styles.cartItemActions}>
                    <p className={styles.itemTotal}>${item.price * item.quantity}</p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className={styles.removeBtn}
                    >
                      Remove
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <div className={styles.cartSummary}>
          <h3>Order Summary</h3>
          <div className={styles.summaryRow}>
            <span>Subtotal</span>
            <span>${totalPrice}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className={styles.summaryTotal}>
            <span>Total</span>
            <span>${totalPrice}</span>
          </div>
          <button className={styles.checkoutBtn} onClick={handleCheckout}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </main>
  );
}