import { createSelector } from '@reduxjs/toolkit';

const selectWishlist = state => state.wishlist;

export const selectWishlistItems = createSelector(
  [selectWishlist],
  (wishlist) => wishlist.wishlistItems
);

export const selectAllFavItems = createSelector(
  [selectWishlist],
  (wishlist) => [...wishlist.wishlistItems, ...wishlist.toAdd]
);

export const selectWishlistItemsCount = createSelector(
  [selectWishlistItems],
  (wishlistItems) => 
    wishlistItems.length
);