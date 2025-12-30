"use client"

import { useState } from "react"
import { ThemeSelector } from "@/components/theme-selector"
import { DecodeText } from "@/components/decode-text"
import { TerminalLine } from "@/components/terminal-line"
import { TypewriterCommand } from "@/components/typewriter-command"

const reviews = [
  {
    year: 2024,
    title: "拥抱变化，持续成长",
    summary: "这一年，我学会了在不确定性中寻找确定性，在变化中保持初心。",
  },
  {
    year: 2023,
    title: "从0到1的突破",
    summary: "完成了人生中许多重要的第一次，每一次尝试都让我更加相信自己的可能性。",
  },
  {
    year: 2022,
    title: "沉淀与思考",
    summary: "在这个特殊的年份里，我有了更多时间与自己对话，重新审视生活的意义。",
  },
  {
    year: 2021,
    title: "新的起点",
    summary: "告别学生时代，正式踏入社会。每一步都走得小心翼翼，却也充满期待。",
  },
]

export default function HomePage() {
  const [headerDone, setHeaderDone] = useState(false)
  const [commandDone, setCommandDone] = useState(false)

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <header className="px-6 py-12 max-w-2xl mx-auto w-full">
        <div className="font-mono text-xs text-muted-foreground mb-4">
          <span className="text-primary">~</span>/annual-review
        </div>
        <h1 className="text-xl font-mono font-medium tracking-tight text-foreground">
          <span className="text-primary">$</span> cat reviews.md
          <span className="cursor-blink text-primary ml-1">_</span>
        </h1>
        <p className="text-sm text-muted-foreground mt-3 font-mono">
          <DecodeText text="记录每一年的成长轨迹" delay={200} onComplete={() => setHeaderDone(true)} />
        </p>
      </header>

      <section className="px-6 pb-20 max-w-2xl mx-auto w-full flex-1">
        <div className="font-mono text-sm text-muted-foreground mb-3 h-5">
          {headerDone && (
            <TypewriterCommand command="ls -la ./reviews/" delay={100} onComplete={() => setCommandDone(true)} />
          )}
        </div>

        <div className={commandDone ? "visible" : "invisible"}>
          <div className="font-mono text-sm text-muted-foreground/60 mb-4 border-b border-border pb-2">
            total {reviews.length}
          </div>
          <div className="space-y-1">
            {reviews.map((review, index) => (
              <TerminalLine
                key={review.year}
                index={index}
                year={review.year}
                title={review.title}
                summary={review.summary}
                delay={100}
                startAnimation={commandDone}
              />
            ))}
          </div>
        </div>
      </section>

      <footer className="px-6 py-8 max-w-2xl mx-auto w-full flex items-center justify-between">
        <p className="text-xs text-muted-foreground font-mono">
          <span className="text-primary">#</span> EOF © {new Date().getFullYear()}
        </p>
        <ThemeSelector />
      </footer>
    </main>
  )
}
