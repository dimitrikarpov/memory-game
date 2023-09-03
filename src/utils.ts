import { GameField, GameFieldItem, SecretField } from "./types"

export const findOrFail = <T>(arr: T[], predicate: (item: T) => boolean): T => {
  const found = arr.find(predicate)

  if (!found) throw "not found"

  return found
}

export const findIndexOfFail = <T>(
  arr: T[],
  predicate: (item: T) => boolean,
): number => {
  const index = arr.findIndex(predicate)

  if (index === -1) throw "not found"

  return index
}

export const openFieldCard = (
  field: GameField,
  id: number,
  secretField: SecretField,
): [GameField, number] => {
  const cardIndex = findIndexOfFail<GameFieldItem>(
    field,
    ({ id: cardId }) => cardId === id,
  )

  const openedValue = secretField[cardIndex].value

  const newField = [...field]
  newField[cardIndex] = {
    ...field[cardIndex],
    value: openedValue,
  }

  return [newField, openedValue]
}

export const closeFieldCard = (field: GameField, id: number): GameField => {
  const cardIndex = findIndexOfFail<GameFieldItem>(
    field,
    ({ id: cardId }) => cardId === id,
  )

  const newField = [...field]
  newField[cardIndex] = {
    ...field[cardIndex],
    value: undefined,
  }

  return newField
}

export const closeFieldCards = (
  field: GameField,
  ids: (number | undefined)[],
): GameField => {
  let newField = [...field]

  for (const id of ids) {
    newField = closeFieldCard(newField, id!)
  }

  return newField
}

function randomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const randomizeField = (x: number, y: number): SecretField => {
  const total = x * y
  const maxValue = total / 2

  const values: number[] = []
  for (let i = 1; i <= maxValue; i++) {
    values.push(i)
    values.push(i)
  }

  const field = Array.from({ length: total }).map((_, index) => {
    const randomValue = values.splice(randomInteger(0, values.length - 1), 1)[0]
    return { id: index + 1, value: randomValue }
  })

  return field
}

export const clearField = (field: GameField) => {
  return field.map((item) => ({ ...item, value: undefined }))
}
