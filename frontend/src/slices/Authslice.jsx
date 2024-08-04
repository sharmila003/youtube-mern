import { createSlice } from "@reduxjs/toolkit";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("authState");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Could not load state", err);
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("authState", serializedState);
  } catch (err) {
    console.error("Could not save state", err);
  }
};

const initialState = loadState() || {
  accessToken: null,
  isLoggedIn: false,
  userId: null,
  watchLaterList: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoginState: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.accessToken = action.payload.accessToken;
      state.userId = action.payload.userId;
      saveState(state); // Save state to localStorage
    },
    setLogoutState: (state) => {
      state.isLoggedIn = false;
      state.userId = null;
      saveState(state); // Save state to localStorage
    },
    addToWatchLater(state, action) {
      state.watchLaterList.push(action.payload);
      saveState(state); // Save state to localStorage
    },
    removeFromWatchLater: (state, action) => {
      state.watchLaterList = state.watchLaterList.filter(
        (id) => id !== action.payload
      );
      saveState(state); // Save state to localStorage
    },
  },
});

export const {
  setLoginState,
  setLogoutState,
  addToWatchLater,
  removeFromWatchLater,
} = authSlice.actions;
export default authSlice.reducer;
