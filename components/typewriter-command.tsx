"use client"

import { useEffect, useState } from "react"

interface TypewriterCommandProps {
  command: string
  delay?: number
  onComplete?: () => void
}

export function TypewriterCommand({ command, delay = 0, onComplete }: TypewriterCommandProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [phase, setPhase] = useState<"waiting" | "typing" | "done">("waiting")
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    const waitTimer = setTimeout(() => {
      setPhase("typing")
    }, delay)
    return () => clearTimeout(waitTimer)
  }, [delay])

  useEffect(() => {
    if (phase !== "typing") return

    let currentIndex = 0
    const typeInterval = setInterval(() => {
      if (currentIndex <= command.length) {
        setDisplayedText(command.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(typeInterval)
        setPhase("done")
        setTimeout(() => {
          onComplete?.()
        }, 80)
      }
    }, 25)

    return () => clearInterval(typeInterval)
  }, [phase, command, onComplete])

  // 光标闪烁
  useEffect(() => {
    if (phase === "done") {
      setShowCursor(false)
      return
    }
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 530)
    return () => clearInterval(cursorInterval)
  }, [phase])

  return (
    <span>
      <span className="text-primary">$</span> {displayedText}
      {phase !== "done" && <span className={`text-primary ${showCursor ? "opacity-100" : "opacity-0"}`}>▋</span>}
    </span>
  )
}
