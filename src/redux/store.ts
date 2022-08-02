import { configureStore } from '@reduxjs/toolkit'
//import { persistStore } from 'redux-persist';
//import logger from 'redux-logger';
import thunk from 'redux-thunk';

import appReducer from './app/app.reducer';
import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';
import categoriesReducer from './categories/categories.slice';
import collectionsReducer from './collections/collections.reducer';
import wishlistReducer from './wishlist/wishlist.reducer';

//const middlewares = [thunk];

// if (process.env.NODE_ENV === 'development') {
//   middlewares.push(logger);
// }

export const store = configureStore({
  reducer: {
    app: appReducer,
    user: userReducer,
    cart: cartReducer,
    categories: categoriesReducer,
    collections: collectionsReducer,
    wishlist: wishlistReducer
  }});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {app: AppState, user: userState, cart: cartState, categories: categoriesState, collections: collectionsState, wishlist: wishlistState }
export type AppDispatch = typeof store.dispatch


// applyMiddleware(...middlewares)
// export const persistor = persistStore(store);
// export default { store, persistor };
export default store;
