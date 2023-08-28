import { motion, AnimatePresence } from "framer-motion"

type Props = {
  onStartClick: () => void
}

export const StartScreen: React.FunctionComponent<Props> = ({
  onStartClick,
}) => {
  return (
    <motion.div
      initial={{ x: -300, opacity: 0, background: "red" }}
      animate={{ x: 0, opacity: 1, background: "transparent" }}
      exit={{ x: 300, opacity: 0, background: "green" }}
    >
      <div className="flex h-screen w-screen flex-col items-center justify-center gap-8">
        <h1>memory game</h1>
        <button onClick={onStartClick}>Start</button>
      </div>
    </motion.div>
  )
}
