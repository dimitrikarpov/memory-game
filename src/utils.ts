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
