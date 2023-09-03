import React from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { TrophyImg } from "./trophy-img"

type Props = {
  open: boolean
  shuffleField: () => void
  exitToStartScreen: () => void
}

export const SuccessDialog: React.FunctionComponent<Props> = ({
  open,
  shuffleField,
  exitToStartScreen,
}) => {
  const shuffle = () => {
    shuffleField()
  }

  return (
    <Dialog.Root open={open}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-[#263435bd] data-[state=open]:animate-overlayShow" />
        <Dialog.Content className="fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-[#242424] bg-white p-[25px] text-black text-white shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow">
          <SuccessDialogContent
            shuffleField={shuffle}
            exitToStartScreen={exitToStartScreen}
          />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

type SuccessDialogContentProps = {
  shuffleField: () => void
  exitToStartScreen: () => void
}

const SuccessDialogContent: React.FunctionComponent<
  SuccessDialogContentProps
> = ({ shuffleField, exitToStartScreen }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <TrophyImg />

      <div className="pb-6 text-5xl font-bold">You Win !!</div>

      <div className="mt-5 flex gap-10">
        <button
          onClick={exitToStartScreen}
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
            Play Again !
          </span>
        </button>
      </div>
    </div>
  )
}
