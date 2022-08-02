import { createSelector } from '@reduxjs/toolkit';

const selectApp = state => state.app;

export const selectIsXs = createSelector(
  [selectApp],
  (app) => app.isXs
);

export const selectMobileView = createSelector(
  [selectApp],
  (app) => app.mobileView
);

export const selectIsMenuSideDrawerOpen = createSelector(
  [selectApp],
  (app) => app.sideMenuDrawerOpen
);