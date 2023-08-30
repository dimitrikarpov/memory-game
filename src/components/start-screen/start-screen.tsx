import { motion } from "framer-motion"
import { BrainImg } from "./brain-img"

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
      <div className="flex h-screen w-screen flex-col items-center justify-center pb-[100px]">
        <div className="-mt-[150px] mb-[100px] flex items-center justify-center gap-6 text-5xl font-extrabold uppercase">
          <div>Memory</div>
          <BrainImg />
          <div>Game</div>
        </div>

        <button
          onClick={onStartClick}
          className="rounded-md bg-zinc-300 px-8 py-4 text-4xl text-black transition-opacity hover:opacity-50"
        >
          Start
        </button>
      </div>
    </motion.div>
  )
}
