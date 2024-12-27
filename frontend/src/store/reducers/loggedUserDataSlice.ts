import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ILoggedUserData } from '../../interfaces/interfaces';
import { TLoggedUserDataState } from '../../types/types';

const initialState: ILoggedUserData = {
  value: null,
};

export const loggedUserDataSlice = createSlice({
  name: 'loggedUserData',
  initialState,
  reducers: {
    addLoggedUserData: (state, action: PayloadAction<TLoggedUserDataState>) => {
      state.value = action.payload;
    },
  },
});

export const { addLoggedUserData } = loggedUserDataSlice.actions;

export default loggedUserDataSlice.reducer;
