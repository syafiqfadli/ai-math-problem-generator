"use client"

import { useState } from "react"
import Button from "./Button"

interface DifficultyProps {
  disabled: boolean
  onClick: (difficulty: "easy" | "medium" | "hard") => void
}

const difficulties = [
  { value: "easy" as const, text: "Easy", bgColor: "green" },
  { value: "medium" as const, text: "Medium", bgColor: "yellow" },
  { value: "hard" as const, text: "Hard", bgColor: "red" },
]

export default function Difficulty({ disabled, onClick }: DifficultyProps) {
  const [selected, setSelected] = useState<"easy" | "medium" | "hard">("easy")

  const handleClick = (difficulty: "easy" | "medium" | "hard") => {
    setSelected(difficulty)
    onClick(difficulty)
  }

  return (
    <>
      <p className="mb-4 text-black">Choose difficulty:</p>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        {difficulties.map((difficulty) => (
          <div
            key={difficulty.value}
            className={`flex-1 ${
              selected && selected !== difficulty.value ? "opacity-30" : ""
            }`}
          >
            <Button
              text={difficulty.text}
              bgColor={difficulty.bgColor}
              onClick={() => handleClick(difficulty.value)}
              disabled={disabled}
            />
          </div>
        ))}
      </div>
    </>
  )
}
