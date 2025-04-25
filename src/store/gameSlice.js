import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentGame: "colors", // Options: 'colors', 'numbers', 'dragDrop' (future)
  progress: {
    colors: { score: 0, completed: false },
    numbers: { score: 0, completed: false },
    dragDrop: { score: 0, completed: false },
  },
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setCurrentGame(state, action) {
      state.currentGame = action.payload;
    },
    updateProgress(state, action) {
      const { game, score, completed } = action.payload;
      state.progress[game] = { score, completed };
    },
  },
});

export const { setCurrentGame, updateProgress } = gameSlice.actions;
export default gameSlice.reducer;
