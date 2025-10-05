"use client"

import { useCallback, useState } from "react"

export function useSnackbar(duration: number = 3000) {
  const [message, setMessage] = useState("")
  const [type, setType] = useState<"success" | "error" | "info">("info")
  const [visible, setVisible] = useState(false)

  const showSnackbar = useCallback(
    (msg: string, msgType: "success" | "error" | "info" = "info") => {
      setMessage(msg)
      setType(msgType)
      setVisible(true)
    },
    [duration]
  )

  return { message, type, visible, showSnackbar, hide: () => setVisible(false) }
}
