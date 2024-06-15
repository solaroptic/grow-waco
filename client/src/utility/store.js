import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import userReducer from "./userSlice";
import { userApiSlice } from "../api/userApiSlice.js";
import { proposalsApiSlice } from "../api/proposalsApiSlice.js";
import { commentsApiSlice } from "../api/commentsApiSlice.js";

const rootReducer = combineReducers({
  // state reducers
  user: userReducer,
  // API slice reducers
  [userApiSlice.reducerPath]: userApiSlice.reducer,
  [proposalsApiSlice.reducerPath]: proposalsApiSlice.reducer,
  [commentsApiSlice.reducerPath]: commentsApiSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApiSlice.middleware)
      .concat(proposalsApiSlice.middleware)
      .concat(commentsApiSlice.middleware),
});

setupListeners(store.dispatch);
