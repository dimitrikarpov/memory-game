import { useState } from "react"
import { StartScreen } from "./components/start-screen/start-screen"
import { GameScreen } from "./components/game-screen/game-screen"
import { Screen } from "./types"
import { AnimatePresence } from "framer-motion"
import { Provider } from "react-redux"
import { store } from "./lib/store"

function App() {
  const [screen, setScreen] = useState<Screen>("start")

  const onStartClick = () => {
    setScreen("game")
  }

  const onBackClick = () => {
    setScreen("start")
  }

  return (
    <Provider store={store}>
      <div className="overflow-hidden">
        <AnimatePresence mode="wait">
          {screen === "start" && <StartScreen onStartClick={onStartClick} />}
          {screen === "game" && <GameScreen onBackClick={onBackClick} />}
        </AnimatePresence>
      </div>
    </Provider>
  )
}

export default App
