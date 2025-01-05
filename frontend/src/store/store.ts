import { configureStore } from '@reduxjs/toolkit';
import loggedUserReducer from './reducers/loggedUserDataSlice';
import usersPostsDataReducer from './reducers/usersPostsDataSlice';
import allUsersDataReducer from './reducers/allUsersDataSlice';
import userRelationshipsReducer from './reducers/userRelationshipSlice';

const store = configureStore({
  reducer: {
    loggedUserData: loggedUserReducer,
    usersPostsData: usersPostsDataReducer,
    allUsersData: allUsersDataReducer,
    userRelationships: userRelationshipsReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
