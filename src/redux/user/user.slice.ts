import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState } from './user.types';

  
const initialState: UserState = {
    currentUser: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCurrentUser: (state, action: PayloadAction<any>) => {
            state.currentUser = action.payload
        }
    }
});

export const { setCurrentUser } = userSlice.actions;

export const selectCurrentUser = (state: UserState) => state.currentUser;

export default userSlice.reducer;