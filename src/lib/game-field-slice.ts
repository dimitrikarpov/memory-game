import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { GameField, GameFieldItem, SecretField } from "../types"
import { clearField, randomizeField } from "../utils"
import { type RootState } from "./store"

export interface GameFieldSlice {
  secretField: SecretField
  gameField: GameField
  prevClickedCard: GameFieldItem | undefined
  animationInProgress: boolean
  isFieldSolved: boolean
}

const secretField = randomizeField(4, 4)
const gameField = clearField(secretField)

const initialState: GameFieldSlice = {
  secretField: secretField,
  gameField: gameField,
  prevClickedCard: undefined,
  animationInProgress: false,
  isFieldSolved: false,
}

export const gameFieldSlice = createSlice({
  name: "game-field",
  initialState,
  reducers: {
    setSecretField: (state, action: PayloadAction<SecretField>) => {
      state.secretField = action.payload
    },
    setGameField: (state, action: PayloadAction<GameField>) => {
      state.gameField = action.payload
    },
    setPrevClickedCard: (
      state,
      action: PayloadAction<GameFieldItem | undefined>,
    ) => {
      state.prevClickedCard = action.payload
    },
    setAnimationInProgress: (state, action: PayloadAction<boolean>) => {
      state.animationInProgress = action.payload
    },
    setIsFieldSolved: (state, action: PayloadAction<boolean>) => {
      state.isFieldSolved = action.payload
    },
    reset: (state) => {
      state.secretField = randomizeField(4, 4)
      state.gameField = clearField(secretField)
      state.prevClickedCard = undefined
      state.animationInProgress = false
      state.isFieldSolved = false
    },
  },
})

export default gameFieldSlice.reducer

export const {
  setSecretField,
  setGameField,
  setPrevClickedCard,
  setAnimationInProgress,
  setIsFieldSolved,
  reset,
} = gameFieldSlice.actions

export const selectSecretField = (state: RootState) => state.game.secretField
export const selectGameField = (state: RootState) => state.game.gameField
export const selectPrevClickedCard = (state: RootState) =>
  state.game.prevClickedCard
export const selectAnimationInProgress = (state: RootState) =>
  state.game.animationInProgress
export const selectIsFieldSolved = (state: RootState) =>
  state.game.isFieldSolved
