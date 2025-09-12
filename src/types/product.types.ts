export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

export interface CategoryResponse {
  _id: string;
  name: string;
  __v: number;
}

export interface CategoryType {
  name: string;
}

export interface ImageUploadResponse {
  message: string;
  image: string;
}

export interface ProductResponse {
  _id: string;
  name: string;
  image: string;
  brand: string;
  quantity: number;
  category: CategoryResponse;
  description: string;
  rating: number;
  numReviews: number;
  price: number;
  countInStock: number;
  reviews: any[]; // You can define a Review interface if reviews have a shape
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
}

// Example: array of products
export type ProductList = Product[];
