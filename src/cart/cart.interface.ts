import { Item } from 'src/items/item.interface';

export interface CartItem {
  item_id: string;
  item: Item;
  quantity: number;
}

export interface Cart {
  cart_id: string;
  cart_name: string;
  items: CartItem[];
  created_time: number;
}
