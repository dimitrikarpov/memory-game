import { useState } from "react"
import { FieldGrid } from "./FieldGrid"
import {
  clearField,
  closeFieldCards,
  openFieldCard,
  randomizeField,
} from "./utils"
import { flushSync } from "react-dom"
import { GameField, GameFieldItem } from "./types"

const secretField = randomizeField(4, 4)
const gameField = clearField(secretField)

function App() {
  const [field, setField] = useState<GameField>(gameField)
  const [prevClickedCard, setPrevClickedCard] = useState<GameFieldItem>()
  const [shouldBlockField, setShouldBlockField] = useState(false)

  const onCardClick = (item: GameFieldItem) => {
    if (shouldBlockField || item.value) return

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
      }, 350)
    }
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <FieldGrid
        field={field}
        onCardClick={onCardClick}
        isBlocked={shouldBlockField}
      />
    </div>
  )
}

export default App
