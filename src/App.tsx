import { useState } from "react"
import { FieldGrid } from "./FieldGrid"
import {
  clearField,
  closeFieldCards,
  openFieldCard,
  randomizeField,
} from "./utils"
import { flushSync } from "react-dom"

export type FieldItem = { id: number; value: number | undefined }
export type Field = FieldItem[]

const secretField = randomizeField(4, 4)
const newField = clearField(secretField)

function App() {
  const [field, setField] = useState<Field>(newField)
  const [prevClickedCard, setPrevClickedCard] = useState<FieldItem>()
  const [shouldBlockField, setShouldBlockField] = useState(false)

  const onCardClick = (item: FieldItem) => {
    if (shouldBlockField) return

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
      setShouldBlockField(true)

      setTimeout(() => {
        setPrevClickedCard(undefined)

        flushSync(() => {
          const newField = closeFieldCards(field, [prevClickedCard.id, item.id])

          setField(newField)
          setShouldBlockField(false)
        })
      }, 500)
    }
  }

  return (
    <>
      <FieldGrid
        field={field}
        onCardClick={onCardClick}
        isBlocked={shouldBlockField}
      />
    </>
  )
}

export default App
