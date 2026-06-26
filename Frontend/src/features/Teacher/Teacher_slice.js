import { createSlice } from "@reduxjs/toolkit";

const storedTeacher = localStorage.getItem("teacher") 

const initialState = {
  teacher:  storedTeacher && storedTeacher !== "undefined" ? JSON.parse(storedTeacher) : null,
  loading: false,
  error: null,
};

const teacherSlice = createSlice({
  name: "teacher",
  initialState,

  reducers: {
    // Start any API request
    teacherRequest: (state) => {
      state.loading = true;
      state.error = null;
    },

    // Save teacher after fetching/registering
    teacherSuccess: (state, action) => {
      state.loading = false;
      state.teacher = action.payload;
      state.error = null;
    },

    // API failed
    teacherFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Update teacher details
    updateTeacher: (state, action) => {
      if (state.teacher) {
        state.teacher = {
          ...state.teacher,
          ...action.payload,
        };
      }
    },

    // Update verification status
    verifyTeacher: (state) => {
      if (state.teacher) {
        state.teacher.isVerifiedTeacher = true;
      }
    },

    // Clear teacher data
    clearTeacher: (state) => {
      state.teacher = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  teacherRequest,
  teacherSuccess,
  teacherFailure,
  updateTeacher,
  verifyTeacher,
  clearTeacher,
} = teacherSlice.actions;

export default teacherSlice.reducer;