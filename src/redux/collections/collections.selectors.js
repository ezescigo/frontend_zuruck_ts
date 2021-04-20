import { createSelector } from 'reselect';

const selectShop = state => state.collections;

export const selectCollections = createSelector(
  [selectShop],
  collections => collections.collections
);

// Selector to transform from obj to array so .map keeps working on our components
export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  collections => (collections ? Object.keys(collections).map(key => collections[key]) : [])
);

export const selectCollection = (category, subcategory) => createSelector(
  [selectCollections],
  collections => (collections
    ? (collections[subcategory] || collections[category] || collections['preview'])
    : null
  )
);

export const selectQueryResults = createSelector(
  [selectShop],
  collections => collections.query && collections.query
);

export const selectIsCollectionFetching = createSelector(
  [selectShop],
  collections => collections.isFetching | collections.collections === {} | !collections.isLoaded
);

export const selectIsFetchingQuery = createSelector(
  [selectShop],
  collections => collections.isFetchingQuery
);

export const selectIsCollectionsLoaded = createSelector(
  [selectCollections],
  collections => !!collections & (collections !== {})
);

// export const selectLoadingQuery = createSelector(
//   [selectCollections],
//   collections => collections.query | 
// );