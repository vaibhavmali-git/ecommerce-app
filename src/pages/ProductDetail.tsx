import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useProductDetail } from '../hooks/useProductDetail';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const { product, loading, error } = useProductDetail(id);
  
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  if (loading) {
    return <main style={{ padding: '2rem', textAlign: 'center' }}>Loading product details...</main>;
  }

  if (error || !product) {
    return <main style={{ padding: '2rem', color: 'red', textAlign: 'center' }}>{error || 'Product not found'}</main>;
  }

  const cleanImage = (product.images[0] || '').replace(/^\["|"\]$/g, '');

  return (
    <main className="product-detail-container">
      <button 
        onClick={() => navigate(-1)} 
        className="back-link" 
        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
      >
        ← Back to products
      </button>
      
      <div className="product-detail-grid">
        <div className="product-detail-image">
          <img src={cleanImage || 'https://via.placeholder.com/600'} alt={product.title} />
        </div>
        
        <div className="product-detail-info">
          <p className="product-category">{product.category.name}</p>
          <h2>{product.title}</h2>
          <p className="product-price">${product.price}</p>
          <p className="product-description">{product.description}</p>
          
          <motion.button 
            className="add-to-cart-btn"
            onClick={handleAddToCart}
            whileTap={{ scale: 0.95 }}
            animate={{ backgroundColor: isAdded ? '#10b981' : '#111827' }}
            transition={{ duration: 0.2 }}
          >
            {isAdded ? '✓ Added to Cart' : 'Add to Cart'}
          </motion.button>
        </div>
      </div>
    </main>
  );
}