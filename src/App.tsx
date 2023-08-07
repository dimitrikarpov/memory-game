import { useState } from "react"
import { FieldGrid } from "./FieldGrid"
import { closeFieldCards, openFieldCard } from "./utils"
import { flushSync } from "react-dom"

export type FieldItem = { id: number; value: number | undefined }
export type Field = FieldItem[]

const secretField: Field = [
  {
    id: 1,
    value: 1,
  },
  {
    id: 2,
    value: 1,
  },
  {
    id: 3,
    value: 2,
  },
  {
    id: 4,
    value: 2,
  },
  {
    id: 5,
    value: 3,
  },
  {
    id: 6,
    value: 3,
  },
  {
    id: 7,
    value: 4,
  },
  {
    id: 8,
    value: 4,
  },
  {
    id: 9,
    value: 5,
  },
  {
    id: 10,
    value: 5,
  },
  {
    id: 11,
    value: 6,
  },
  {
    id: 12,
    value: 6,
  },
  {
    id: 13,
    value: 7,
  },
  {
    id: 14,
    value: 7,
  },
  {
    id: 15,
    value: 8,
  },
  {
    id: 16,
    value: 8,
  },
]

const newField: Field = [
  {
    id: 1,
    value: undefined,
  },
  {
    id: 2,
    value: undefined,
  },
  {
    id: 3,
    value: undefined,
  },
  {
    id: 4,
    value: undefined,
  },
  {
    id: 5,
    value: undefined,
  },
  {
    id: 6,
    value: undefined,
  },
  {
    id: 7,
    value: undefined,
  },
  {
    id: 8,
    value: undefined,
  },
  {
    id: 9,
    value: undefined,
  },
  {
    id: 10,
    value: undefined,
  },
  {
    id: 11,
    value: undefined,
  },
  {
    id: 12,
    value: undefined,
  },
  {
    id: 13,
    value: undefined,
  },
  {
    id: 14,
    value: undefined,
  },
  {
    id: 15,
    value: undefined,
  },
  {
    id: 16,
    value: undefined,
  },
]

function App() {
  const [field, setField] = useState<Field>(newField)
  const [prevClickedCard, setPrevClickedCard] = useState<FieldItem>()

  const onCardClick = (item: FieldItem) => {
    const [newField, openedValue] = openFieldCard(field, item.id, secretField)

    setField(newField)

    if (!prevClickedCard) {
      setPrevClickedCard({ ...item, value: openedValue })

      return
    }

    if (prevClickedCard.value === openedValue) {
      setPrevClickedCard(undefined)

      return
    }

    if (prevClickedCard.value !== openedValue) {
      setTimeout(() => {
        setPrevClickedCard(undefined)

        flushSync(() => {
          const newField = closeFieldCards(field, [prevClickedCard.id, item.id])

          setField(newField)
        })
      }, 500)
    }
  }

  return (
    <>
      <FieldGrid field={field} onCardClick={onCardClick} />
    </>
  )
}

export default App
