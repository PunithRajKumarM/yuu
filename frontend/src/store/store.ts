import { configureStore } from '@reduxjs/toolkit';
import loggedUserReducer from './reducers/loggedUserDataSlice';

const store = configureStore({
  reducer: {
    loggedUserData: loggedUserReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;