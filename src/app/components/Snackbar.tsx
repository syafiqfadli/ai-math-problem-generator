"use client"

interface SnackbarProps {
  message: string
  type?: "success" | "error" | "info"
  show: boolean
  onClose: () => void
}

export default function Snackbar({
  message,
  type = "info",
  show,
  onClose,
}: SnackbarProps) {
  const bgColor =
    type === "success"
      ? "bg-green-600"
      : type === "error"
      ? "bg-red-600"
      : "bg-blue-600"

  return (
    <div
      className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg text-white 
        transition-all duration-300 text-center ${bgColor}
        ${
          show
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        }`}
    >
      <div className="flex items-center justify-between">
        <p>{message}</p>
        <span className="ml-4 cursor-pointer" onClick={onClose}>
          X
        </span>
      </div>
    </div>
  )
}
