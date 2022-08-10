import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Collection, CollectionsState, FetchCollectionRequest } from './collections.types';
import { Item } from "../../models/item";
import axios from 'axios';

const initialState: CollectionsState = {
    collections: [],
    query: [],
    isFetching: false,
    isFetchingQuery: false,
    isLoaded: false,
    errorMessage: undefined,
  };

export const collectionsSlice = createSlice({
    name: 'collections',
    initialState,
    reducers: {
        fetchCollectionsStart: state => {
            state.isFetching = true;
        },
        fetchCollectionsSuccess: (state, action: PayloadAction<Collection[]>) => {
            state.isFetching = false,
            state.isLoaded = true,
            state.collections = action.payload
        },
        fetchCollectionsFailure: (state, action: PayloadAction<string>) => {
            state.isFetching = false,
            state.errorMessage = action.payload
        },
        fetchQueryStart: (state, action: PayloadAction<any>) => {
            state.isFetchingQuery = true
        },
        fetchQuerySuccess: (state, action: PayloadAction<any>) => {
            state.isFetchingQuery = false,
            state.query = action.payload
        },
        fetchQueryFailure: (state, action: PayloadAction<string>) => {
            state.isFetchingQuery = false,
            state.errorMessage = action.payload
        },
        fetchCollectionsOffline: (state, action: PayloadAction<any>) => {
            state.isFetching = false,
            state.isLoaded = true,
            state.collections = action.payload
        }
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchPreview.pending, (state) => {
          state.isFetching = true;
        })
        .addCase(fetchPreview.fulfilled, (state, action) => {
          state.isFetching = false;
          state.collections = action.payload;
        })
        .addCase(fetchPreview.rejected, (state) => {
          state.isFetching = false;
          state.errorMessage = 'Request Preview failed'
        })
        .addCase(fetchCollection.pending, (state) => {
          state.isFetching = true;
        })
        .addCase(fetchCollection.fulfilled, (state, action) => {
          state.isFetching = false;
          state.collections = action.payload;
        })
        .addCase(fetchCollection.rejected, (state) => {
          state.isFetching = false;
          state.errorMessage = 'Request Preview failed'
        })
        .addCase(fetchQuery.pending, (state) => {
          state.isFetching = true;
        })
        .addCase(fetchQuery.fulfilled, (state, action) => {
          state.isFetching = false;
          state.collections = action.payload;
        })
        .addCase(fetchQuery.rejected, (state) => {
          state.isFetching = false;
          state.errorMessage = 'Request Preview failed'
        })
    }
})

// TODO: infrastructure layer - API's endpoints & unify into 1 endpoint.
export const fetchPreview = createAsyncThunk(
  'collections/fetchPreview',
  async (arg, thunkAPI) => {
    // TODO: infrastructure layer - API's endpoints.
    let apiUrl = `https://zuruck-backend.herokuapp.com/api/products/preview`;
    const response = await axios.get('https://zuruck-backend.herokuapp.com/api/category');
    return response.data;
  }
)

export const fetchCollection = createAsyncThunk(
  'collections/fetchCollection',
  async (request: FetchCollectionRequest, thunkAPI) => {
    const { category, subCategory } = request;
    // TODO: infrastructure layer - API's endpoints.
    let path = category ? `/${category}` : '';
    path += subCategory ? `/${subCategory}` : '';

    const apiUrl = `https://zuruck-backend.herokuapp.com/api/products${path}`;

    const response = await axios.get(apiUrl);
    return response.data;
  }
)

export const fetchQuery = createAsyncThunk(
  'collections/fetchQuery',
  async (query: FetchCollectionRequest, thunkAPI) => {
    // TODO: infrastructure layer - API's endpoints.

    const apiUrl = `http://localhost:5600/api/products?query=${query}`

    const response = await axios.get(apiUrl);
    return response.data;
  }
)

// Actions
export const { 
    fetchCollectionsStart, 
    fetchCollectionsSuccess, 
    fetchCollectionsFailure, 
    fetchCollectionsOffline, 
    fetchQueryStart, 
    fetchQuerySuccess, 
    fetchQueryFailure 
} = collectionsSlice.actions;

// Selects
export const selectCollection = (state: CollectionsState) => state.collections;

export const selectQueryResults = (state: CollectionsState) => state.query;

export const selectIsCollectionFetching = (state: CollectionsState) => state.isFetching || !state.isLoaded

export const selectIsFetchingQuery = (state: CollectionsState) => state.isFetchingQuery

export const selectIsCollectionsLoaded = (state: CollectionsState) => state.isLoaded

export default collectionsSlice.reducer;

// export const selectCollection = (category, subcategory) => createSelector(
//     [selectCollections],
//     collections => (collections
//       ? (collections[subcategory] || collections[category] || collections['preview'])
//       : null
//     )
//   );