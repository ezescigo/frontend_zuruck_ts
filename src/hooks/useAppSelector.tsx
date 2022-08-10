import { TypedUseSelectorHook, useSelector } from 'react-redux'
import type { RootState } from '../redux/store';

// Use throughout your app instead of plain `useSelector`
// Use it like
// const cart = useAppSelector(state => state.cart)
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector