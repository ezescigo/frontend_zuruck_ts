import AppActionsTypes from './app.types';

const INITIAL_STATE = {
  mobileView: false,
  sideMenuDrawerOpen: false,
};

const appReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AppActionsTypes.TOGGLE_MOBILE_VIEW:
      return {
        ...state,
        mobileView: action.payload,
      }
    case AppActionsTypes.TOGGLE_MENU_SIDE_DRAWER:
      return {
        ...state,
        sideMenuDrawerOpen: action.payload
      }
    default:
      return state
  }
};

export default appReducer;