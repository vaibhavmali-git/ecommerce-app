import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cartItems, removeFromCart, totalPrice, totalItems } = useCart();

  if (cartItems.length === 0) {
    return (
      <main className="cart-page empty">
        <h2>Your Cart is Empty</h2>
        <p>Looks like you haven't added anything yet.</p>
        <Link to="/" className="continue-shopping-btn">
          Continue Shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <h2>Your Cart ({totalItems} items)</h2>
      
      <div className="cart-layout">
        
        <div className="cart-items-list">
          {cartItems.map((item) => {
          
            const cleanImage = (item.images[0] || '').replace(/^\["|"\]$/g, '');
            
            return (
              <div key={item.id} className="cart-item">
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
              </div>
            );
          })}
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
          
          <button 
            className="checkout-btn" 
            onClick={() => alert('Checkout flow not implemented yet!')}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </main>
  );
}