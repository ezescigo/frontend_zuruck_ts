import { useDispatch  } from 'react-redux'
import type { AppDispatch } from '../redux/store';

// Use throughout your app instead of plain `useDispatch`
// Use it like:
// const dispatch = useAppDispatch()
export const useAppDispatch: () => AppDispatch = useDispatch;