import React, { useState } from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { TrophyImg } from "./trophy-img"

type Props = {
  open: boolean
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>
}

export const SuccessDialog: React.FunctionComponent<Props> = ({
  open,
  onOpenChange,
}) => {
  console.log("DialogDemo")

  const close = () => {
    onOpenChange(false)

    console.log("oi close")
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-[#263435bd] data-[state=open]:animate-overlayShow" />
        <Dialog.Content className="fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-[#242424] bg-white p-[25px] text-black text-white shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow">
          <SuccessDialogContent close={close} />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

type SuccessDialogContentProps = {
  close: () => void
}

const SuccessDialogContent: React.FunctionComponent<
  SuccessDialogContentProps
> = ({ close }) => {
  console.log("SuccessDialogContent")

  return (
    <div className="flex flex-col items-center justify-center">
      <TrophyImg />

      <div className="pb-6 text-5xl font-bold">You Win !!</div>
      <button onClick={close}>close</button>
    </div>
  )
}
