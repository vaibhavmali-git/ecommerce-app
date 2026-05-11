import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchProducts, fetchCategories } from '../api/products';
import type { Product, Category } from '../types';

export function useProductGrid() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const selectedCategories = searchParams.getAll('category'); 
  const sortOrder = searchParams.get('sort') || 'default';
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const limit = 12;

  useEffect(() => {
    fetchCategories().then(setCategories).catch(console.error);
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts(selectedCategories);
        setAllProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [searchParams.getAll('category').join(',')]); 

  const { paginatedProducts, totalPages } = useMemo(() => {
    const processed = [...allProducts];

    if (sortOrder === 'price-asc') {
      processed.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'price-desc') {
      processed.sort((a, b) => b.price - a.price);
    }

    const total = Math.ceil(processed.length / limit);
    const startIndex = (currentPage - 1) * limit;
    const sliced = processed.slice(startIndex, startIndex + limit);

    return { paginatedProducts: sliced, totalPages: total };
  }, [allProducts, sortOrder, currentPage]);

  const handleCategoryToggle = (categoryId: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (selectedCategories.includes(categoryId)) {
      const updated = selectedCategories.filter(id => id !== categoryId);
      newParams.delete('category');
      updated.forEach(id => newParams.append('category', id));
    } else {
      newParams.append('category', categoryId);
    }
    newParams.set('page', '1');
    setSearchParams(newParams);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newParams = new URLSearchParams(searchParams);
    if (e.target.value === 'default') {
      newParams.delete('sort');
    } else {
      newParams.set('sort', e.target.value);
    }
    newParams.set('page', '1');
    setSearchParams(newParams);
  };

  const handlePageChange = (newPage: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', newPage.toString());
    setSearchParams(newParams);
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  };

  return {
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
    handlePageChange
  };
}