import React, { useState } from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { TrophyImg } from "./trophy-img"

type Props = {
  open: boolean
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>
}

const DialogDemo = () => {
  console.log("DialogDemo")

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="shadow-blackA7 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none text-black shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none">
          Edit profile
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-[#263435bd] data-[state=open]:animate-overlayShow" />
        <Dialog.Content className="fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-[#242424] bg-white p-[25px] text-black text-white shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow">
          <SuccessDialogContent />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default DialogDemo

const SuccessDialogContent = () => {
  console.log("SuccessDialogContent")

  return (
    <div className="flex flex-col items-center justify-center">
      <TrophyImg />

      <div className="pb-6 text-5xl font-bold">You Win !!</div>
    </div>
  )
}
