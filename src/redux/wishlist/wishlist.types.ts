import { Item } from "../../models/item";

export interface WishlistState {
  wishlistItemsIds: number[];
  itemIdsToAdd: number[];
  itemIdsToRemove: number[];
}