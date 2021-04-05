import AppActionsTypes from './app.types';

export const showMobileView = (isMobile) => ({
  type: AppActionsTypes.TOGGLE_MOBILE_VIEW,
  payload: isMobile
});

export const toggleMenuSideDrawer = (isDrawerOpen) => ({
  type: AppActionsTypes.TOGGLE_MENU_SIDE_DRAWER,
  payload: isDrawerOpen
});