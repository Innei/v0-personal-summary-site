"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

const themes = [
  { id: "github-light", name: "github light", color: "bg-white border-neutral-300" },
  { id: "github-dark", name: "github dark", color: "bg-[#0d1117]" },
  { id: "monokai", name: "monokai", color: "bg-amber-900" },
  { id: "dracula", name: "dracula", color: "bg-purple-900" },
  { id: "nord", name: "nord", color: "bg-slate-700" },
]

export function ThemeSelector() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const currentTheme = theme === "system" ? resolvedTheme : theme

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-muted-foreground font-mono">theme:</span>
      <div className="flex items-center gap-1.5">
        {themes.map((t) => (
          <button
            key={t.id}
            onClick={() => setTheme(t.id)}
            className={`group relative w-4 h-4 rounded-full ${t.color} border border-border transition-transform hover:scale-110 ${
              currentTheme === t.id ? "ring-1 ring-primary ring-offset-1 ring-offset-background" : ""
            }`}
            title={t.name}
          >
            <span className="sr-only">{t.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
