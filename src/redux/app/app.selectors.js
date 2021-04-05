import { createSelector } from 'reselect';

const selectApp = state => state.app;

export const selectMobileView = createSelector(
  [selectApp],
  (app) => app.mobileView
);

export const selectIsMenuSideDrawerOpen = createSelector(
  [selectApp],
  (app) => app.sideMenuDrawerOpen
);