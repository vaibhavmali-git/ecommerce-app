import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchProducts, fetchCategories } from '../api/products';
import type { Product, Category } from '../types';
import ProductCard from '../components/ProductCard/ProductCard';

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const selectedCategories = searchParams.getAll('category'); 
  const sortOrder = searchParams.get('sort') || 'default';

  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .catch(err => console.error('Failed to load categories', err));
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts(selectedCategories);
        
        if (sortOrder === 'price-asc') {
          data.sort((a, b) => a.price - b.price);
        } else if (sortOrder === 'price-desc') {
          data.sort((a, b) => b.price - a.price);
        }

        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [searchParams]);

  const handleCategoryToggle = (categoryId: string) => {
    const newParams = new URLSearchParams(searchParams);
    
    if (selectedCategories.includes(categoryId)) {
      const updated = selectedCategories.filter(id => id !== categoryId);
      newParams.delete('category');
      updated.forEach(id => newParams.append('category', id));
    } else {
      newParams.append('category', categoryId);
    }
    
    setSearchParams(newParams);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newParams = new URLSearchParams(searchParams);
    if (e.target.value === 'default') {
      newParams.delete('sort');
    } else {
      newParams.set('sort', e.target.value);
    }
    setSearchParams(newParams);
  };

  return (
    <main style={{ padding: '2rem' }}>
      <div className="home-layout">
        
        
        <aside className="filter-section">
          <div className="filter-group">
            <h3>Categories</h3>
            {categories.map((cat) => (
              <label key={cat.id} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat.id.toString())}
                  onChange={() => handleCategoryToggle(cat.id.toString())}
                />
                {cat.name}
              </label>
            ))}
          </div>

          <div className="filter-group">
            <h3>Sort By</h3>
            <select 
              value={sortOrder} 
              onChange={handleSortChange}
              className="sort-select"
            >
              <option value="default">Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </aside>

        
        <div style={{ flex: 1 }}>
          {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
          
          {loading ? (
            <div>Loading products...</div>
          ) : products.length === 0 ? (
            <div>No products found.</div>
          ) : (
            <div className="product-grid">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
        
      </div>
    </main>
  );
}