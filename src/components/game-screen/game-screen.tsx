import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { flushSync } from "react-dom"
import { GameField, GameFieldItem, SecretField } from "../../types"
import {
  clearField,
  closeFieldCards,
  openFieldCard,
  randomizeField,
} from "../../utils"
import { FieldGrid } from "./FieldGrid"

type Props = {
  onBackClick: () => void
}

export const GameScreen: React.FunctionComponent<Props> = ({ onBackClick }) => {
  const [secretField, setSecretField] = useState<SecretField>(() =>
    randomizeField(4, 4),
  )
  const [field, setField] = useState<GameField>(() => clearField(secretField))
  const [prevClickedCard, setPrevClickedCard] = useState<GameFieldItem>()
  const [shouldBlockField, setShouldBlockField] = useState(false)
  const [isGameOver, setGameOver] = useState(false)

  useEffect(() => {
    field.every(({ value }) => Boolean(value)) && setGameOver(true)
  }, [field])

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

  const onShuffleClick = () => {
    const secretField = randomizeField(4, 4)
    const gameField = clearField(secretField)
    setGameOver(false)
    setSecretField(secretField)
    setField(gameField)
  }

  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
    >
      <div className="flex h-screen w-screen flex-col items-center justify-center gap-8">
        <FieldGrid
          field={field}
          onCardClick={onCardClick}
          isBlocked={shouldBlockField}
        />

        <div className="h-[52px]">
          <button onClick={onBackClick}>back</button>

          {isGameOver && (
            <button
              onClick={onShuffleClick}
              className="group relative mb-2 mr-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 group-hover:from-purple-600 group-hover:to-blue-500 dark:text-white dark:focus:ring-blue-800"
            >
              <span className="relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900">
                new game
              </span>
            </button>
          )}
        </div>

        {/* <motion.div
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0, transition: { duration: 0.5, ease: "circOut" } }}
        exit={{ scaleX: 1, transition: { duration: 0.3, ease: "circIn" } }}
        style={{ originX: isPresent ? 0 : 1 }}
        className="fixed inset-0 z-10 bg-slate-900"
      /> */}
      </div>
    </motion.div>
  )
}