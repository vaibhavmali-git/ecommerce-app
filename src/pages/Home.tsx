import { useEffect, useState } from 'react';
import { fetchProducts } from '../api/products';
import type { Product } from '../types';
import ProductCard from '../components/ProductCard/ProductCard';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return <main style={{ padding: '2rem', textAlign: 'center' }}>Loading products...</main>;
  }

  if (error) {
    return <main style={{ padding: '2rem', color: 'red', textAlign: 'center' }}>Error: {error}</main>;
  }

  return (
    <main style={{ padding: '2rem' }}>
      <h2>All Products</h2>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}