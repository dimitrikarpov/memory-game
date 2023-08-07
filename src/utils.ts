import { Field, FieldItem } from "./App"

export const findOrFail = <T extends unknown>(
  arr: T[],
  predicate: (item: T) => boolean,
): T => {
  const found = arr.find(predicate)

  if (!found) throw "not found"

  return found
}

export const findIndexOfFail = <T extends unknown>(
  arr: T[],
  predicate: (item: T) => boolean,
): number => {
  const index = arr.findIndex(predicate)

  if (index === -1) throw "not found"

  return index
}

export const getCardValueById = (field: Field, id: number) => {
  const found = findOrFail(field, ({ id: itemId }) => itemId === id)

  return found.value
}

export const openFieldCard = (
  field: Field,
  id: number,
  secretField: Field,
): [Field, number] => {
  const cardIndex = findIndexOfFail<FieldItem>(
    field,
    ({ id: cardId }) => cardId === id,
  )

  const openedValue = secretField[cardIndex].value!

  const newField = [...field]
  newField[cardIndex] = {
    ...field[cardIndex],
    value: openedValue,
  }

  return [newField, openedValue]
}

export const closeFieldCard = (field: Field, id: number): Field => {
  const cardIndex = findIndexOfFail<FieldItem>(
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

export const closeFieldCards = (field: Field, ids: number[]): Field => {
  let newField = [...field]

  for (const id of ids) {
    newField = closeFieldCard(newField, id)
  }

  return newField
}

function randomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const randomizeField = (x: number, y: number): Field => {
  const total = x * y
  const maxValue = total / 2

  let values: number[] = []
  for (let i = 1; i <= maxValue; i++) {
    values.push(i)
    values.push(i)
  }

  let field = Array.from({ length: total }).map((_, index) => {
    const randomValue = values.splice(randomInteger(0, values.length - 1), 1)[0]
    return { id: index + 1, value: randomValue }
  })

  return field
}

export const clearField = (field: Field) => {
  return field.map((item) => ({ ...item, value: undefined }))
}
