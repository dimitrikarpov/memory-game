import clsx from "clsx"
import { GameField, GameFieldItem } from "../../types"

type Props = {
  field: GameField
  isBlocked: boolean
  onCardClick: (item: GameFieldItem) => void
}

export const FieldGrid: React.FunctionComponent<Props> = ({
  field,
  isBlocked,
  onCardClick,
}) => {
  return (
    <div
      className={clsx(
        "grid w-fit grid-cols-4 grid-rows-4 gap-3",
        isBlocked && "pointer-events-none",
      )}
    >
      {field.map((item) => (
        <div
          onClick={() => {
            onCardClick(item)
          }}
          className={clsx(
            "flex h-[100px] w-[100px] items-center justify-center border border-white text-5xl",
            !item.value &&
              "bg-slate-500 hover:cursor-pointer hover:bg-slate-700",
          )}
          key={item.id}
        >
          {item.value || " "}
        </div>
      ))}
    </div>
  )
}
