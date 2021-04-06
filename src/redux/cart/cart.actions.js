import CartActionTypes from './cart.types';

export const toggleCartHidden = menuActive => ({
  type: CartActionTypes.TOGGLE_CART_HIDDEN,
  payload: menuActive
});

export const openCartDropdown = () => ({
  type: CartActionTypes.OPEN_CART_DROPDOWN
});

export const closeCartDropdown = () => ({
  type: CartActionTypes.CLOSE_CART_DROPDOWN
});



export const addItem = item => ({
  type: CartActionTypes.ADD_ITEM,
  payload: item
});

export const removeItemFromCart = item => ({
  type: CartActionTypes.REMOVE_ITEM,
  payload: item
});

export const clearItemFromCart = item => ({
  type: CartActionTypes.CLEAR_ITEM_FROM_CART,
  payload: item
});