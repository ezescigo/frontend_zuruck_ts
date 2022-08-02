import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import CategoriesActionTypes from './categories.type';
import { ListToTree } from './categories.utils';
import { Category } from '../../models/category';

interface CategoriesState {
  categories: any[] | null,
  isFetching: boolean,
  isLoaded: boolean,
  errorMessage: any
}

const initialState: CategoriesState = {
  categories: null,
  isFetching: true,
  isLoaded: false,
  errorMessage: undefined
}

// const categoriesReducer = (state = INITIAL_STATE, action) => {
//   switch (action.type) {
//     case CategoriesActionTypes.FETCH_CATEGORIES_START:
//       return {
//         ...state,
//         isFetching: true
//       };
//     case CategoriesActionTypes.FETCH_CATEGORIES_SUCCESS:
//       return {
//         ...state,
//         isFetching: false,
//         isLoaded: true,
//         categories: ListToTree(action.payload)
//       };
//     case CategoriesActionTypes.FETCH_CATEGORIES_FAILURE:
//       return {
//         ...state,
//         isFetching: false,
//         errorMessage: action.payload
//       };
//     case CategoriesActionTypes.FETCH_CATEGORIES_OFFLINE:
//       return {
//         ...state,
//         isFetching: false,
//         isLoaded: true,
//         categories: ListToTree(action.payload)
//       }
//     default:
//       return state;
//   }
// };

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    fetchCategoriesStart: state => {
      state.isFetching = true
    },
    fetchCategoriesSuccess: (state, action: PayloadAction<Category>) => {
      state.isLoaded = true;
      state.categories = ListToTree(action.payload)
    },
    fetchCategoriesFailure: (state, action: PayloadAction<Category>) => {
      state.isFetching = false;
      state.errorMessage = action.payload
    },
    fetchCategoriesOffline: (state, action: PayloadAction<Category>) => {
      state.isFetching = false;
      state.isLoaded = true;
      state.categories = ListToTree(action.payload)
    }
  }
})