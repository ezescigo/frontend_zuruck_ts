import { Item } from "../../models/item";

export interface CartState {
  hidden: boolean;
  cartItems: Item[];
  menuActive: DropdownMenus;
}

export namespace DropdownMenus {
  export const WISHLIST = 'wishlist';
  export const CART = 'cart';
};
export type DropdownMenus = typeof DropdownMenus[keyof typeof DropdownMenus];