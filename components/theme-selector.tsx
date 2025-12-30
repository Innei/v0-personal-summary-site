"use client"

import { useEffect, useState } from "react"

const themes = [
  { id: "github-light", name: "github light", color: "bg-white border-neutral-300" },
  { id: "github-dark", name: "github dark", color: "bg-[#0d1117]" },
  { id: "monokai", name: "monokai", color: "bg-amber-900" },
  { id: "dracula", name: "dracula", color: "bg-purple-900" },
  { id: "nord", name: "nord", color: "bg-slate-700" },
]

export function ThemeSelector() {
  const [current, setCurrent] = useState("github-light")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem("shell-theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    if (saved) {
      setCurrent(saved)
      applyTheme(saved)
    } else if (prefersDark) {
      setCurrent("github-dark")
      applyTheme("github-dark")
    }
  }, [])

  const applyTheme = (themeId: string) => {
    const html = document.documentElement
    html.classList.remove(
      "dark",
      "theme-github-light",
      "theme-github-dark",
      "theme-monokai",
      "theme-dracula",
      "theme-nord",
    )

    if (themeId === "github-dark") {
      html.classList.add("dark", "theme-github-dark")
    } else if (themeId !== "github-light") {
      html.classList.add(`theme-${themeId}`)
    }
  }

  const setTheme = (themeId: string) => {
    setCurrent(themeId)
    localStorage.setItem("shell-theme", themeId)
    applyTheme(themeId)
  }

  if (!mounted) return null

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-muted-foreground font-mono">theme:</span>
      <div className="flex items-center gap-1.5">
        {themes.map((theme) => (
          <button
            key={theme.id}
            onClick={() => setTheme(theme.id)}
            className={`group relative w-4 h-4 rounded-full ${theme.color} border border-border transition-transform hover:scale-110 ${
              current === theme.id ? "ring-1 ring-primary ring-offset-1 ring-offset-background" : ""
            }`}
            title={theme.name}
          >
            <span className="sr-only">{theme.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
