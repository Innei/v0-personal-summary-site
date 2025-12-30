'use client'

import { useEffect, useState } from 'react'

interface TerminalLineProps {
  index: number
  year: number
  title: string
  summary: string
  url?: string
  delay: number
  startAnimation?: boolean
}

interface NoteData {
  size: number
  created: string
}

export function TerminalLine({
  index,
  year,
  title,
  summary,
  url,
  delay,
  startAnimation = true,
}: TerminalLineProps) {
  const [phase, setPhase] = useState<'waiting' | 'decoding' | 'done'>('waiting')
  const [displayTitle, setDisplayTitle] = useState(title)
  const [displaySummary, setDisplaySummary] = useState(summary)
  const [isHovered, setIsHovered] = useState(false)
  const [glitchText, setGlitchText] = useState({ title: '', summary: '' })
  const [noteData, setNoteData] = useState<NoteData | null>(null)

  useEffect(() => {
    if (!startAnimation) return

    const showTimer = setTimeout(() => {
      setPhase('decoding')
    }, delay)

    return () => clearTimeout(showTimer)
  }, [delay, startAnimation])

  useEffect(() => {
    if (phase !== 'decoding') return

    const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`ABCDEFabcdef0123456789'
    const iterations = 4
    const intervalMs = 30

    const titleProgress = new Array(title.length).fill(0)
    const summaryProgress = new Array(summary.length).fill(0)

    const decodeInterval = setInterval(() => {
      let titleDone = true
      let summaryDone = true

      const newTitle = title
        .split('')
        .map((char, i) => {
          if (titleProgress[i] >= iterations) return char
          titleDone = false
          titleProgress[i]++
          return chars[Math.floor(Math.random() * chars.length)]
        })
        .join('')
      setDisplayTitle(newTitle)

      const newSummary = summary
        .split('')
        .map((char, i) => {
          if (summaryProgress[i] >= iterations) return char
          summaryDone = false
          summaryProgress[i]++
          return chars[Math.floor(Math.random() * chars.length)]
        })
        .join('')
      setDisplaySummary(newSummary)

      if (titleDone && summaryDone) {
        setPhase('done')
        setDisplayTitle(title)
        setDisplaySummary(summary)
        clearInterval(decodeInterval)
      }
    }, intervalMs)

    return () => clearInterval(decodeInterval)
  }, [phase, title, summary])

  useEffect(() => {
    if (!isHovered || phase !== 'done') return

    const chars = '!@#$%^&*_+-=|;<>?~0123456789'
    let frame = 0
    const maxFrames = 8

    const glitchInterval = setInterval(() => {
      frame++
      if (frame > maxFrames) {
        setGlitchText({ title, summary })
        clearInterval(glitchInterval)
        return
      }

      const glitchedTitle = title
        .split('')
        .map((char, i) =>
          Math.random() > 0.85
            ? chars[Math.floor(Math.random() * chars.length)]
            : char,
        )
        .join('')
      const glitchedSummary = summary
        .split('')
        .map((char, i) =>
          Math.random() > 0.9
            ? chars[Math.floor(Math.random() * chars.length)]
            : char,
        )
        .join('')

      setGlitchText({ title: glitchedTitle, summary: glitchedSummary })
    }, 50)

    return () => clearInterval(glitchInterval)
  }, [isHovered, phase, title, summary])

  const handleMouseEnter = () => {
    setIsHovered(true)
    setGlitchText({ title, summary })
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setGlitchText({ title: '', summary: '' })
  }

  // 从 URL 提取 note ID 并获取数据
  useEffect(() => {
    if (!url) return

    const match = url.match(/innei\.in\/notes\/(\d+)/)
    if (!match) return

    const noteId = match[1]
    const fetchNoteData = async () => {
      try {
        const response = await fetch(
          `https://mx.innei.in/api/v2/notes/nid/${noteId}`,
        )
        if (!response.ok) return

        const data = await response.json()
        if (data?.data) {
          // 计算文本大小（字节数），使用 TextEncoder 确保与服务器端一致
          const textSize = new TextEncoder().encode(data.data.text || '').length
          setNoteData({
            size: textSize,
            created: data.data.created,
          })
        }
      } catch (error) {
        console.error('Failed to fetch note data:', error)
      }
    }

    fetchNoteData()
  }, [url])

  const permissions = '-rw-r--r--'
  const owner = 'innei'
  const group = 'staff'

  // 格式化文件大小
  const formatSize = (bytes: number) => {
    return bytes.toString().padStart(4, ' ')
  }

  // 格式化日期和时间
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ]
    const month = months[date.getMonth()]
    const day = date.getDate().toString().padStart(2, ' ')
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    return { month, day, time: `${hours}:${minutes}` }
  }

  const size = noteData
    ? formatSize(noteData.size)
    : `${(1024 + index * 256).toString().padStart(4, ' ')}`

  const dateInfo = noteData
    ? formatDate(noteData.created)
    : {
        month: ['Jan', 'Mar', 'Jun', 'Sep'][index] || 'Dec',
        day: String(Math.min(28, 10 + index * 5)).padStart(2, ' '),
        time: '17:54',
      }

  const month = dateInfo.month
  const day = dateInfo.day
  const time = dateInfo.time

  const shownTitle =
    isHovered && glitchText.title
      ? glitchText.title
      : phase === 'done'
      ? title
      : displayTitle
  const shownSummary =
    isHovered && glitchText.summary
      ? glitchText.summary
      : phase === 'done'
      ? summary
      : displaySummary

  const content = (
    <>
      {/* 权限和元信息行 */}
      <div className="font-mono text-sm text-muted-foreground/70 flex items-center gap-x-3 leading-none">
        <span className="w-24">{permissions}</span>
        <span className="w-12">{owner}</span>
        <span className="w-10">{group}</span>
        <span className="w-12 text-right">{size}</span>
        <span className="w-6">{month}</span>
        <span className="w-4 text-right">{day}</span>
        <span className="w-12">{time}</span>
        <span
          className={`text-primary font-medium ${
            isHovered ? 'animate-pulse' : ''
          }`}
        >
          {year}.md
        </span>
      </div>
      {/* 标题和摘要行 */}
      <div className="font-mono pl-6 mt-0.5">
        <p
          className={`text-sm transition-colors ${
            isHovered ? 'text-primary' : 'text-foreground'
          }`}
        >
          <span className="text-muted-foreground/50"># </span>
          {phase === 'decoding' ? (
            <span className="text-primary">
              {displayTitle}
              <span className="cursor-blink">_</span>
            </span>
          ) : (
            <>
              {shownTitle}
              {isHovered && (
                <span className="cursor-blink text-primary ml-0.5">_</span>
              )}
            </>
          )}
        </p>
        <p
          className={`text-sm mt-0.5 line-clamp-1 transition-colors ${
            isHovered ? 'text-muted-foreground' : 'text-muted-foreground/60'
          }`}
        >
          <span className="text-muted-foreground/40">{'>'} </span>
          {phase === 'decoding' ? (
            <span className="text-primary/50">{displaySummary}</span>
          ) : (
            shownSummary
          )}
        </p>
      </div>
    </>
  )

  const baseClass = 'group py-2 rounded relative'
  const wrapperClass =
    phase === 'waiting'
      ? `${baseClass} invisible`
      : `${baseClass} transition-all cursor-pointer ${
          isHovered
            ? 'bg-primary/5 shadow-[inset_0_0_20px_rgba(var(--primary),0.1)]'
            : ''
        }`

  const linkHref = url || `/review/${year}`
  const isExternal = url?.startsWith('http')

  if (phase === 'waiting') {
    return <div className={wrapperClass}>{content}</div>
  }

  return (
    <a
      href={linkHref}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className={`block ${wrapperClass}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent h-8 animate-scan" />
        </div>
      )}
      {content}
    </a>
  )
}
