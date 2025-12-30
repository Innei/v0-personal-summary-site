"use client"

import { useEffect, useState } from "react"

interface DecodeTextProps {
  text: string
  className?: string
  delay?: number
  onComplete?: () => void
}

const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

export function DecodeText({ text, className, delay = 0, onComplete }: DecodeTextProps) {
  const [displayText, setDisplayText] = useState(() => text.replace(/[^ ]/g, "\u00A0"))

  useEffect(() => {
    const timer = setTimeout(() => {
      let iteration = 0
      const maxIterations = Math.ceil(text.length * 1.5)

      const interval = setInterval(() => {
        setDisplayText(
          text
            .split("")
            .map((char, index) => {
              if (char === " ") return " "
              if (index < iteration / 1.5) {
                return char
              }
              return chars[Math.floor(Math.random() * chars.length)]
            })
            .join(""),
        )

        iteration++
        if (iteration >= maxIterations) {
          setDisplayText(text)
          clearInterval(interval)
          onComplete?.()
        }
      }, 15)

      return () => clearInterval(interval)
    }, delay)

    return () => clearTimeout(timer)
  }, [text, delay, onComplete])

  return <span className={className}>{displayText}</span>
}
