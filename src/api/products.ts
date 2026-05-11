import type { Product } from "../types";

const BASE_URL = 'https://api.escuelajs.co/api/v1';

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${BASE_URL}/products`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  
  return response.json();
};