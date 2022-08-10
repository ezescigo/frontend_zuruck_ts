import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartState, DropdownMenus } from './cart.types';
import { Item } from '../../models/item';
import { addItemToCart } from './cart.utils';
import { removeItemFromCart } from './cart.utils';

const initialState: CartState = {
  hidden: true,
  cartItems: [],
  menuActive: DropdownMenus.CART
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    openCartDropdown: state => {
      state.hidden = false
    },
    closeCartDropdown: state => {
      state.hidden = true
    },
    toggleCartDropdown: (state, action: PayloadAction<DropdownMenus>) => {
      state.hidden = !state.hidden,
      state.menuActive = action.payload
    },
    addItem: (state, action: PayloadAction<Item>) => {
      state.cartItems = addItemToCart(state.cartItems, action.payload)
    },
    removeItem: (state, action: PayloadAction<Item>) => {
      state.cartItems = removeItemFromCart(state.cartItems, action.payload)
    },
    clearItemFromCart: (state, action: PayloadAction<Item>) => {
      state.cartItems = state.cartItems.filter(cartItem => cartItem._id !== action.payload._id)
    },
  }
})

export const { openCartDropdown, closeCartDropdown, toggleCartDropdown, addItem, removeItem, clearItemFromCart } = cartSlice.actions;

export const selectCartItems = (state: CartState) => state.cartItems;
export const selectCartHidden = (state: CartState) => state.hidden;
export const selectMenuActive = (state: CartState) => state.menuActive;
export const selectCartItemsCount = (state: CartState) => state.cartItems.reduce((accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.quantity, 0);
export const selectCartTotal = (state: CartState) => state.cartItems.reduce((accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.quantity * cartItem.price, 0);;

export default cartSlice.reducer;