import ProductCard from "../components/ProductCard/ProductCard";
import Pagination from "../components/Pagination";
import { useProductGrid } from "../hooks/useProductGrid";

export default function Home() {
  const {
    paginatedProducts,
    categories,
    loading,
    error,
    selectedCategories,
    sortOrder,
    currentPage,
    totalPages,
    handleCategoryToggle,
    handleSortChange,
    handlePageChange,
  } = useProductGrid();

  return (
    <main style={{ padding: "2rem" }}>
      <div className="home-layout">
        {/* Sidebar */}
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

        {/* Main Content */}
        <div style={{ flex: 1 }}>
          {error && (
            <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>
          )}

          {loading ? (
            <div>Loading products...</div>
          ) : paginatedProducts.length === 0 ? (
            <div>No products found.</div>
          ) : (
            <>
              <div className="product-grid">
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}
