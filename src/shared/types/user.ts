import type { Order } from "./order";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string | null;
  avatar: string | null;
  phone: number;
  createdAt: number | null;
  updatedAt: number | null;
  orders?: Order[];
}
