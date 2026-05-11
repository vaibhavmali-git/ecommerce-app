import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProductById } from '../api/products';
import type { Product } from '../types';
import { useCart } from '../context/CartContext';


export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const loadProduct = async () => {
      try {
        setLoading(true);
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return <main style={{ padding: '2rem', textAlign: 'center' }}>Loading product details...</main>;
  }

  if (error || !product) {
    return <main style={{ padding: '2rem', color: 'red', textAlign: 'center' }}>{error || 'Product not found'}</main>;
  }


  const rawImage = product.images[0] || '';
  const cleanImage = rawImage.replace(/^\["|"\]$/g, '');

  return (
    <main className="product-detail-container">
      <Link to="/" className="back-link">
        ← Back to products
      </Link>

      <div className="product-detail-grid">
        <div className="product-detail-image">
          <img
            src={cleanImage || 'https://via.placeholder.com/600'}
            alt={product.title}
          />
        </div>

        <div className="product-detail-info">
          <p className="product-category">{product.category.name}</p>
          <h2>{product.title}</h2>
          <p className="product-price">${product.price}</p>
          <p className="product-description">{product.description}</p>

          <button
            className="add-to-cart-btn"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </main>
  );
}