import { GameField, GameFieldItem, SecretField } from "../types"
import {
  clearField,
  closeFieldCards,
  openFieldCard,
  randomizeField,
} from "../utils"
import {
  setAnimationInProgress,
  setIsFieldSolved,
  setPrevClickedCard,
  setGameField,
} from "./game-field-slice"
import { store } from "./store"

export class Game {
  private _gameField: GameField = []

  private _secretField: SecretField = []

  private _animationInProgress: boolean = false

  private _prevClickedCard: GameFieldItem | undefined

  private _isFieldSolved: boolean = false

  constructor() {
    this.prepareFields()
    this.reset = this.reset.bind(this)
  }

  get gameField() {
    return this._gameField
  }

  set gameField(field: GameField) {
    this._gameField = field
    store.dispatch(setGameField(field))
  }

  get animationInProgress() {
    return this._animationInProgress
  }

  set animationInProgress(isRunning: boolean) {
    this._animationInProgress = isRunning
    store.dispatch(setAnimationInProgress(isRunning))
  }

  get prevClickedCard() {
    return this._prevClickedCard
  }

  set prevClickedCard(item: GameFieldItem | undefined) {
    this._prevClickedCard = item
    store.dispatch(setPrevClickedCard(item))
  }

  get isFieldSolved() {
    return this._isFieldSolved
  }

  set isFieldSolved(isSolved: boolean) {
    this._isFieldSolved = isSolved
    store.dispatch(setIsFieldSolved(isSolved))
  }

  public flipCard(item: GameFieldItem) {
    const openedValue = this.openCard(item.id)

    /* first flipped card */
    if (!this._prevClickedCard) {
      this.prevClickedCard = { ...item, value: openedValue }

      return
    }

    /* second flipped card that matches first flipped card */
    if (this._prevClickedCard.value === openedValue) {
      this.prevClickedCard = undefined

      this.checkIsFieldSolved()

      return
    }

    /* second flipped card not matched first card */
    if (this._prevClickedCard.value !== openedValue) {
      this.animationInProgress = true

      const prevCardId = this._prevClickedCard.id
      const currentCardId = item.id

      setTimeout(() => {
        this.prevClickedCard = undefined

        setTimeout(() => {
          console.log({ prev: this._prevClickedCard, current: item })

          this.closeCards([prevCardId, currentCardId])
          this.animationInProgress = false
        })
      }, 350)
    }
  }

  private openCard(cardId: number) {
    const [newField, openedValue] = openFieldCard(
      this.gameField,
      cardId,
      this._secretField,
    )

    this.gameField = newField

    return openedValue
  }

  private closeCards(cardIds: number[]) {
    const newField = closeFieldCards(this.gameField, cardIds)

    this.gameField = newField
  }

  private checkIsFieldSolved() {
    if (this.gameField.every(({ value }) => Boolean(value))) {
      this.isFieldSolved = true
    }
  }

  private prepareFields() {
    this._secretField = randomizeField(4, 4)
    this.gameField = clearField(this._secretField)
  }

  public reset() {
    this.prepareFields()
    this.prevClickedCard = undefined
    this.animationInProgress = false
    this.isFieldSolved = false
  }
}
