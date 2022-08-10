import { WishlistState } from "./wishlist.types";

export const updateWishlistHelper = (wishlistItems: number[], itemsToRemove: number[], itemsToAdd: number[]): number[] => {
  // Adding items pending to Add
  let updatedList = [...wishlistItems, ...itemsToAdd];
  // Removing items pending to Remove
  return updatedList.filter(item => !(itemsToRemove.some(itemToRemove => itemToRemove === item)));
};

export const toggleWishlistItemHelper = (state: WishlistState, itemId: number): WishlistState => {
  if (state.wishlistItemsIds.length > 0) {

    if (state.wishlistItemsIds.find(wishlistItemId => wishlistItemId === itemId)) {
      state.itemIdsToRemove = [...state.itemIdsToRemove, itemId]
    } else {
      state.itemIdsToAdd = [...state.itemIdsToAdd, itemId]
    }
  } else {
    state.itemIdsToAdd = [...state.itemIdsToAdd, itemId]
  };

  return state
}