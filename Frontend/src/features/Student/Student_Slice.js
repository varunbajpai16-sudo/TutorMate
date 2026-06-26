import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  student: null,
  loading: false,
  error: null,
};

const studentSlice = createSlice({
  name: "student",
  initialState,

  reducers: {
    // API Request Start
    studentRequest: (state) => {
      state.loading = true;
      state.error = null;
    },

    // Register / Fetch Student
    studentSuccess: (state, action) => {
      state.loading = false;
      state.student = action.payload;
      state.error = null;
    },

    // API Failure
    studentFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Update Student Details
    updateStudent: (state, action) => {
      if (state.student) {
        state.student = {
          ...state.student,
          ...action.payload,
        };
      }
    },

    // Clear Student State
    clearStudent: (state) => {
      state.student = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  studentRequest,
  studentSuccess,
  studentFailure,
  updateStudent,
  clearStudent,
} = studentSlice.actions;

export default studentSlice.reducer;