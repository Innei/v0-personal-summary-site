"use client"

import { useState } from "react"
import { ThemeSelector } from "@/components/theme-selector"
import { DecodeText } from "@/components/decode-text"
import { TerminalLine } from "@/components/terminal-line"
import { TypewriterCommand } from "@/components/typewriter-command"

const reviews = [
  {
    year: 2025,
    title: "仍在路上，半径之外",
    summary: "新的一年，继续探索未知的边界。",
    url: "https://innei.in/notes/205",
  },
  {
    year: 2024,
    title: "前路未尽，初心犹在",
    summary: "回顾过去，展望未来，初心不改。",
    url: "https://innei.in/notes/184",
  },
  {
    year: 2023,
    title: "光影交织之年",
    summary: "明暗交替中，记录生活的点滴光芒。",
    url: "https://innei.in/notes/160",
  },
  {
    year: 2022,
    title: "在绝望中前行",
    summary: "即使身处低谷，也要坚持向前。",
    url: "https://innei.in/notes/136",
  },
  {
    year: 2021,
    title: "抉择、未知、迷茫、恐惧",
    summary: "面对人生的十字路口，勇敢做出选择。",
    url: "https://year.innei.ren/2021/",
  },
  {
    year: 2020,
    title: "春华秋实",
    summary: "播种希望，收获成长。",
    url: "https://year.innei.ren/2020/",
  },
  {
    year: 2019,
    title: "梦想和远方",
    summary: "怀揣梦想，踏上追寻远方的旅程。",
    url: "https://year.innei.ren/2019/",
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
                url={review.url}
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
