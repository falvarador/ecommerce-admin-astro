import type { Product } from "./product";
import type { User } from "./user";

export interface CartItem {
  id: string;
  user: User;
  product: Product;
  count: number;
}
