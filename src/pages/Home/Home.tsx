import React, { useState, useRef, useEffect } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import Pagination from "../../components/Pagination/Pagination";
import { useProductGrid } from "../../hooks/useProductGrid";
import { Check, Funnel, CaretDown } from "@phosphor-icons/react";
import styles from "./Home.module.css"; 

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
    clearCategories,
  } = useProductGrid();

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  
  const popoverRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  const allSelected = selectedCategories.length === 0;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getSortLabel = (val: string) => {
    switch (val) {
      case "price-asc": return "Low to High";
      case "price-desc": return "High to Low";
      default: return "Default";
    }
  };

  const onSortSelect = (value: string) => {
    handleSortChange({ target: { value } } as unknown as React.ChangeEvent<HTMLSelectElement>);
    setIsSortOpen(false); // Close popover after selecting
  };

  return (
    <main className={styles.dashboardPage}>
      <div className={styles.dashboardHeader}>
        <h1 className={styles.dashboardTitle}>Products</h1>
      </div>

      <div className={styles.topControls}>
        
        <div className={styles.filterWrapper} ref={popoverRef}>
          <button 
            className={`${styles.filterTriggerBtn} ${isFilterOpen ? styles.triggerActive : ""}`}
            onClick={() => {
              setIsFilterOpen(!isFilterOpen);
              setIsSortOpen(false);
            }}
          >
            <Funnel size={18} weight={isFilterOpen ? "fill" : "regular"} />
            Filter
          </button>

          {isFilterOpen && (
            <div className={styles.filterPopover}>
              <div className={styles.popoverHeader}>
                <div>
                  <h3>Select Categories</h3>
                  <p>Filter products by type</p>
                </div>
                <span className={styles.selectedCount}>
                  {selectedCategories.length} selected
                </span>
              </div>

              <div className={styles.chipsContainer}>
                <button
                  className={`${styles.chip} ${allSelected ? styles.chipSelected : ""}`}
                  onClick={clearCategories}
                >
                  {allSelected && <Check size={16} weight="bold" className={styles.checkIcon} />}
                  All Products
                </button>
                
                {categories.map((cat) => {
                  const isSelected = selectedCategories.includes(cat.id.toString());
                  return (
                    <button
                      key={cat.id}
                      className={`${styles.chip} ${isSelected ? styles.chipSelected : ""}`}
                      onClick={() => handleCategoryToggle(cat.id.toString())}
                    >
                      {isSelected && <Check size={16} weight="bold" className={styles.checkIcon} />}
                      {cat.name}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className={styles.filterWrapper} ref={sortRef}>
          <button
            className={`${styles.filterTriggerBtn} ${isSortOpen ? styles.triggerActive : ""}`}
            onClick={() => {
              setIsSortOpen(!isSortOpen);
              setIsFilterOpen(false);
            }}
          >
            Sort: {getSortLabel(sortOrder)}
            <CaretDown size={14} weight="bold" style={{ marginLeft: "0.2rem" }} />
          </button>

          {isSortOpen && (
            <div className={styles.sortPopover}>
              {[
                { id: "default", label: "Default" },
                { id: "price-asc", label: "Low to High" },
                { id: "price-desc", label: "High to Low" },
              ].map((option) => {
                const isActive = sortOrder === option.id;
                return (
                  <button
                    key={option.id}
                    className={`${styles.sortOption} ${isActive ? styles.sortOptionActive : ""}`}
                    onClick={() => onSortSelect(option.id)}
                  >
                    <div className={styles.sortCheckmark}>
                      {isActive && <Check size={16} weight="bold" />}
                    </div>
                    {option.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>

      </div>

      {error && <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>}

      {loading ? (
        <div className={styles.dashboardState}>Loading products…</div>
      ) : paginatedProducts.length === 0 ? (
        <div className={styles.dashboardState}>No products found.</div>
      ) : (
        <>
          <div className={styles.dashboardGrid}>
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
    </main>
  );
}