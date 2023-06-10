import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const navbarReducer = createReducer(initialState, {


  // get all events 
  getAllNavbarItemsRequest: (state) => {
    state.isLoading = true;
  },
  getAllNavbarItemsSuccess: (state, action) => {
    state.isLoading = false;
    state.allNavbars = action.payload;
  },
  getAllNavbarItemsFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  clearErrors: (state) => {
    state.error = null;
  },
});
