import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from './app.types';

  
const initialState: AppState = {
    isXs: false,
    mobileView: false,
    sideMenuDrawerOpen: false,
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        toggleIsXs: (state, action: PayloadAction<boolean>) => {
            state.isXs = action.payload
        },
        toggleMobileView: (state, action: PayloadAction<boolean>) => {
            state.isXs = action.payload
        },
        toggleMenuSideDrawer: (state, action: PayloadAction<boolean>) => {
            state.isXs = action.payload
        }
    }
});

export const { toggleIsXs, toggleMobileView, toggleMenuSideDrawer } = appSlice.actions;

export const selectIsXs = (state: AppState) => state.isXs;
export const selectMobileView = (state: AppState) => state.mobileView;
export const selectIsMenuSideDrawerOpen = (state: AppState) => state.sideMenuDrawerOpen;

export default appSlice.reducer;