import { createAction, createReducer } from "@reduxjs/toolkit";

export const setUser = createAction("SET_USER");

export const userInitialState = {
  id: null,
  name: null,
  lastName: null,
  email: null,
  role: null,
  favourites: null,
};

export const userReducer = createReducer(userInitialState, (builder) => {
  builder.addCase(setUser, (state, action) => action.payload);
});
