"use client"

interface ButtonProps {
  text: string
  bgColor: string
  disabled: boolean
  onClick: () => void
}

export default function Button({
  text,
  bgColor,
  disabled,
  onClick,
}: ButtonProps) {
  const setColor = () => {
    switch (bgColor) {
      case "blue":
        return "bg-blue-600 hover:bg-blue-700"

      case "yellow":
        return "bg-yellow-600 hover:bg-yellow-700"

      case "red":
        return "bg-red-600 hover:bg-red-700"

      case "green":
        return "bg-green-600 hover:bg-green-700"

      default:
        return "bg-blue-600 hover:bg-blue-700"
    }
  }

  return (
    <button
      onClick={disabled ? () => {} : onClick}
      disabled={disabled}
      className={`cursor-pointer w-full ${setColor()} disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105`}
    >
      {text}
    </button>
  )
}
