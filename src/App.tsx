import { useState } from "react"
import { StartScreen } from "./components/start-screen/start-screen"
import { GameScreen } from "./components/game-screen/game-screen"
import { Screen } from "./types"
import { motion, AnimatePresence } from "framer-motion"

function App() {
  const [screen, setScreen] = useState<Screen>("start")

  const onStartClick = () => {
    setScreen("game")
  }

  const onBackClick = () => {
    setScreen("start")
  }

  return (
    <div className="overflow-hidden">
      <AnimatePresence mode="wait">
        {screen === "start" && <StartScreen onStartClick={onStartClick} />}
        {screen === "game" && <GameScreen onBackClick={onBackClick} />}
      </AnimatePresence>
    </div>
  )
}

export default App
