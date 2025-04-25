import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import gameReducer from "./gameSlice";
import { loadState, saveState } from "./localStorage";

const preloadedState = loadState();

const store = configureStore({
  reducer: {
    user: userReducer,
    game: gameReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
