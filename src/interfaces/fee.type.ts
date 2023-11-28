export interface Fee {
  order_item_type: string;
  fees: FeeItem[];
  distributions: Distributions;
}

export interface Distributions {
  name: string;
  amount: string;
}
export interface FeeItem {
  name: string;
  amount: string;
  type: string;
}
