export interface Order {
  order_date: string;
  order_number: string;
  order_items: OrderItem[];
}

export interface OrderItem {
  type: string;
  pages: number;
}
