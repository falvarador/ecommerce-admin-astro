export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  image: string;
  createdAt?: number;
  updatedAt?: number;
}
