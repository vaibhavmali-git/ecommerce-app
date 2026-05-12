import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { useProductDetail } from '../../hooks/useProductDetail';
import styles from './ProductDetail.module.css';
import ProductDetailSkeleton from '../../components/Loading/ProductDetailSkeleton/ProductDetailSkeleton';

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
    return  <main className={styles.productDetailContainer}>
      <div className={styles.dashboardHeader}>
        <h1 className={styles.dashboardTitle}>Product Details</h1>
      </div>
      <ProductDetailSkeleton />
    </main>
  }

  if (error || !product) {
    return <main style={{ padding: '2rem', color: 'red', textAlign: 'center' }}>{error || 'Product not found'}</main>;
  }

  const cleanImage = (product.images[0] || '').replace(/^\["|"\]$/g, '');

  return (
    <main className={styles.productDetailContainer}>

      <div className={styles.dashboardHeader}>
        <h1 className={styles.dashboardTitle}>Product Details</h1>
      </div>

      <button
        onClick={() => navigate(-1)}
        className={styles.backLink}
      >
        ← Back to products
      </button>

      <div className={styles.productDetailGrid}>
        <div className={styles.productDetailImage}>
          <img src={cleanImage || 'https://via.placeholder.com/600'} alt={product.title} />
        </div>

        <div className={styles.productDetailInfo}>
          <p className={styles.productCategory}>{product.category.name}</p>
          <h2>{product.title}</h2>
          <p className={styles.productPrice}>${product.price}</p>
          <p className={styles.productDescription}>{product.description}</p>

          <motion.button
            className={styles.addToCartBtn}
            onClick={handleAddToCart}
            whileTap={{ scale: 0.95 }}
           animate={{ backgroundColor: isAdded ? '#7FA36B' : '#463A2D' }}
            transition={{ duration: 0.01 }}
          >
            {isAdded ? '✓ Added to Cart' : 'Add to Cart'}
          </motion.button>
        </div>
      </div>
    </main>
  );
}