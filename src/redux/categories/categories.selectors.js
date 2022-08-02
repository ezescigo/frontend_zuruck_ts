import { createSelector } from '@reduxjs/toolkit';

const selectCategories = state => state.categories;

export const selectCategoriesList = createSelector(
  [selectCategories],
  categories => categories.categories
);

export const selectIsCategoriesFetching = createSelector(
  [selectCategories],
  categories => categories.isFetching
);

export const selectIsCategoriesLoaded = createSelector(
  [selectCategories],
  categories => !!categories
)