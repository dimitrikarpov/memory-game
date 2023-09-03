import { motion } from "framer-motion"
import { GameFieldItem } from "../../types"
import { FieldGrid } from "./FieldGrid"
import { SuccessDialog } from "./success-dialog"
import { useSelector, useDispatch } from "react-redux"
import {
  selectGameField,
  selectAnimationInProgress,
  selectIsFieldSolved,
  reset,
} from "../../lib/game-field-slice"
import { Game } from "../../lib/Game"

type Props = {
  onBackClick: () => void
}

const game = new Game([4, 4])

export const GameScreen: React.FunctionComponent<Props> = ({ onBackClick }) => {
  const gameField = useSelector(selectGameField)
  const animationInProgress = useSelector(selectAnimationInProgress)
  const isFieldSolved = useSelector(selectIsFieldSolved)

  const dispatch = useDispatch()

  const onCardClick = (item: GameFieldItem) => {
    if (animationInProgress) return

    game.flipCard(item)
  }

  const exitToStartScreen = () => {
    dispatch(reset())
    onBackClick()
  }

  const onReset = () => {
    game.reset()
  }

  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
      className="flex h-screen w-screen flex-col items-center justify-center gap-8"
    >
      <FieldGrid
        field={gameField}
        onCardClick={onCardClick}
        isBlocked={animationInProgress}
      />

      <div className="flex h-[52px] gap-5">
        <button
          onClick={exitToStartScreen}
          className="group relative mb-2 mr-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-cyan-200 group-hover:from-cyan-500 group-hover:to-blue-500 dark:text-white dark:focus:ring-cyan-800"
        >
          <span className="relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900">
            Return to Start Screen
          </span>
        </button>

        <button
          onClick={onReset}
          className="group relative mb-2 mr-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-purple-200 group-hover:from-purple-500 group-hover:to-pink-500 dark:text-white dark:focus:ring-purple-800"
        >
          <span className="relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900">
            Reset Field
          </span>
        </button>

        <SuccessDialog
          open={isFieldSolved}
          shuffleField={game.reset}
          exitToStartScreen={exitToStartScreen}
        />
      </div>
    </motion.div>
  )
}
