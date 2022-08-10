import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Item } from '../../models/item';
import { WishlistState } from './wishlist.types';
import { toggleWishlistItemHelper, updateWishlistHelper } from './wishlist.utils';

const initialState: WishlistState = {
  wishlistItemsIds: [],
  itemIdsToAdd: [],
  itemIdsToRemove: []
}

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    queueForRemoval: (state, action: PayloadAction<number>) => {
      state.itemIdsToRemove = [...state.itemIdsToRemove, action.payload]
    },
    queueForAdd: (state, action: PayloadAction<number>) => {
      state.itemIdsToAdd = [...state.itemIdsToAdd, action.payload]
    },
    undo: (state, action: PayloadAction<number>) => {
      state.itemIdsToAdd = state.itemIdsToAdd.filter(item => item !== action.payload),
      state.itemIdsToRemove = state.itemIdsToRemove.filter(item => item !== action.payload)
    },
    updateWishlist: (state) => {
      state.itemIdsToAdd = [],
      state.itemIdsToRemove = [],
      state.wishlistItemsIds = updateWishlistHelper(state.wishlistItemsIds, state.itemIdsToRemove, state.itemIdsToAdd)
    },
    clearWishlist: (state) => {
      state.wishlistItemsIds = []
    },
    toggleWishlistItem: (state, action: PayloadAction<number>) => {
      return toggleWishlistItemHelper(state, action.payload)
    },
  }
});

export const { queueForRemoval, queueForAdd, undo, updateWishlist, clearWishlist, toggleWishlistItem } = wishlistSlice.actions;

export const selectWishlistItems = (state: WishlistState) => state.wishlistItemsIds;
export const selectAllFavItems = (state: WishlistState) => [...state.wishlistItemsIds, ...state.itemIdsToAdd];
export const selectWishlistItemsCount = (state: WishlistState) => state.wishlistItemsIds.length;

export default wishlistSlice.reducer;