import { createSlice } from "@reduxjs/toolkit";

const storedParent = localStorage.getItem("parent");

const initialState = {
  parent: storedParent && storedParent !== "undefined" ? JSON.parse(storedParent) : null,
  loading: false,
  error: null,
};

const parentSlice = createSlice({
  name: "parent",
  initialState,

  reducers: {
    // API Request Start
    parentRequest: (state) => {
      state.loading = true;
      state.error = null;
    },

    // Register / Fetch Parent
    parentSuccess: (state, action) => {
      state.loading = false;
      state.parent = action.payload;
      state.error = null;
    },

    // API Failure
    parentFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Update Parent Details
    updateParent: (state, action) => {
      if (state.parent) {
        state.parent = {
          ...state.parent,
          ...action.payload,
        };
      }
    },

    // Clear Parent State
    clearParent: (state) => {
      state.parent = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  parentRequest,
  parentSuccess,
  parentFailure,
  updateParent,
  clearParent,
} = parentSlice.actions;

export default parentSlice.reducer;