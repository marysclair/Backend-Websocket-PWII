import { Order } from "./Order";

export interface User {
  id: string;
  username: string;
  email: string;
  type: "user" | "admin";
  orders: Order[];
}
