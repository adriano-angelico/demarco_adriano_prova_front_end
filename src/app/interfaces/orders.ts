export interface Item {
  item: string;
  value: number;
}

export interface Orders {
  id: number;
  total: number;
  customerId: number;
  items: Item[];
}
