import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ListToTree } from './categories.utils';
import { Category } from '../../models/category';
import data from '../collections/data';
import axios from 'axios';

export interface CategoriesState {
  categories: Category[] | null,
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
      state.categories = ListToTree(data.categories)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoriesStartAsync.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchCategoriesStartAsync.fulfilled, (state, action) => {
        state.isFetching = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategoriesStartAsync.rejected, (state) => {
        state.isFetching = false;
        state.errorMessage = 'Request failed'
      })
  }
})

export const fetchCategoriesStartAsync = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    // TODO: infrastructure layer - API's endpoints.
    const response = await axios.get('https://zuruck-backend.herokuapp.com/api/category');
    return response.data;
  }
)

export const { fetchCategoriesStart, fetchCategoriesSuccess, fetchCategoriesFailure, fetchCategoriesOffline } = categoriesSlice.actions;

export const selectCategoriesList = (state: CategoriesState) => state.categories;
export const selectIsCategoriesFetching = (state: CategoriesState) => state.isFetching;
export const selectIsCategoriesLoaded = (state: CategoriesState) => !!state.categories;

export default categoriesSlice.reducer;