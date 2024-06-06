import type { CartItem } from "./cart-item";
import type { User } from "./user";

export interface Cart {
  user: User;
  items: CartItem[];
  show: boolean;
}
