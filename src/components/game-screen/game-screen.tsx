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
import { SuccessDialog } from "./success-dialog"

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
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)

  useEffect(() => {
    if (field.every(({ value }) => Boolean(value))) {
      openSuccessDialog()
    }
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

  const shuffleField = () => {
    const secretField = randomizeField(4, 4)
    const gameField = clearField(secretField)
    setSecretField(secretField)
    setField(gameField)
  }

  const openSuccessDialog = () => {
    setShowSuccessDialog(true)
  }

  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
      className="flex h-screen w-screen flex-col items-center justify-center gap-8"
    >
      <FieldGrid
        field={field}
        onCardClick={onCardClick}
        isBlocked={shouldBlockField}
      />

      <div className="flex h-[52px] gap-5">
        <button
          onClick={onBackClick}
          className="group relative mb-2 mr-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-cyan-200 group-hover:from-cyan-500 group-hover:to-blue-500 dark:text-white dark:focus:ring-cyan-800"
        >
          <span className="relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900">
            Return to Start Screen
          </span>
        </button>

        <button
          onClick={shuffleField}
          className="group relative mb-2 mr-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-purple-200 group-hover:from-purple-500 group-hover:to-pink-500 dark:text-white dark:focus:ring-purple-800"
        >
          <span className="relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900">
            Reset Field
          </span>
        </button>

        <SuccessDialog
          open={showSuccessDialog}
          onOpenChange={setShowSuccessDialog}
          shuffleField={shuffleField}
          exitToStartScreen={onBackClick}
        />
      </div>
    </motion.div>
  )
}
