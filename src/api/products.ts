import type { Product, Category } from '../types';

const BASE_URL = 'https://api.escuelajs.co/api/v1';

export const fetchCategories = async (): Promise<Category[]> => {
  const response = await fetch(`${BASE_URL}/categories`);
  if (!response.ok) throw new Error('Failed to fetch categories');
  
  const data = await response.json();
  return data.slice(0, 5); 
};

export const fetchProducts = async (categoryIds: string[]): Promise<Product[]> => {
  if (categoryIds.length === 0) {
    const response = await fetch(`${BASE_URL}/products`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
  }

  const promises = categoryIds.map(id => 
    fetch(`${BASE_URL}/products/?categoryId=${id}`).then(res => {
      if (!res.ok) throw new Error(`Failed to fetch category ${id}`);
      return res.json();
    })
  );
  
  const results = await Promise.all(promises);

  return results.flat(); 
};