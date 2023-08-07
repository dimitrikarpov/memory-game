import clsx from "clsx"
import { Field, FieldItem } from "./App"

type Props = {
  field: Field
  onCardClick: (item: FieldItem) => void
}

export const FieldGrid: React.FunctionComponent<Props> = ({
  field,
  onCardClick,
}) => {
  return (
    <div className="grid w-fit grid-cols-4 grid-rows-4 gap-3">
      {field.map((item) => (
        <div
          onClick={() => {
            onCardClick(item)
          }}
          className={clsx(
            "flex h-[100px] w-[100px] items-center justify-center border border-white hover:cursor-pointer hover:bg-slate-700",
            !item.value && "bg-slate-500",
          )}
          key={item.id}
        >
          {item.value || " "}
        </div>
      ))}
    </div>
  )
}
