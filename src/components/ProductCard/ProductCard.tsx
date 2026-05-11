import { Link } from 'react-router-dom';
import type { Product } from '../../types';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const rawImage = product.images[0] || '';
  const cleanImage = rawImage.replace(/^\["|"\]$/g, '');

  return (
    <Link to={`/product/${product.id}`} className={styles.card}>
      <div className={styles.imageContainer}>
        <img
          src={cleanImage || 'https://via.placeholder.com/300'}
          alt={product.title}
          className={styles.image}
          loading="lazy"
        />
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{product.title}</h3>
        <p className={styles.price}>${product.price}</p>
      </div>
    </Link>
  );
}