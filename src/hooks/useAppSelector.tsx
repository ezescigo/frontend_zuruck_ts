import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { AppState } from '../redux/app/app.types';
import { CartState } from '../redux/cart/cart.types';
import { CategoriesState } from '../redux/categories/categories.slice';
import { CollectionsState } from '../redux/collections/collections.types';
import type { RootState } from '../redux/store';
import { UserState } from '../redux/user/user.types';
import { WishlistState } from '../redux/wishlist/wishlist.types';

// Use throughout your app instead of plain `useSelector`
// Use it like
// const cart = useAppSelector(state => state.cart)
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector
export const useCartSelector: TypedUseSelectorHook<CartState> = useSelector
export const useCollectionsSelector: TypedUseSelectorHook<CollectionsState> = useSelector
export const useCategoriesSelector: TypedUseSelectorHook<CategoriesState> = useSelector
export const useUserSelector: TypedUseSelectorHook<UserState> = useSelector
export const useWishlistSelector: TypedUseSelectorHook<WishlistState> = useSelector