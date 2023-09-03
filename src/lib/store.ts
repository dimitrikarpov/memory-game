import { configureStore } from "@reduxjs/toolkit"
import gameFieldSlice from "./game-field-slice"

export const store = configureStore({
  reducer: {
    game: gameFieldSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
