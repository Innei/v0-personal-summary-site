#!/usr/bin/env tsx

/**
 * 脚本用于获取 innei.in/notes 的数据（大小和时间）
 * 使用方法: pnpm tsx scripts/fetch-note-data.ts
 */

interface Review {
  year: number
  title: string
  summary: string
  url: string
}

interface NoteData {
  size: number
  created: string
  nid: number
}

const reviews: Review[] = [
  {
    year: 2025,
    title: '仍在路上，半径之外',
    summary: '新的一年，继续探索未知的边界。',
    url: 'https://innei.in/notes/205',
  },
  {
    year: 2024,
    title: '前路未尽，初心犹在',
    summary: '回顾过去，展望未来，初心不改。',
    url: 'https://innei.in/notes/184',
  },
  {
    year: 2023,
    title: '光影交织之年',
    summary: '明暗交替中，记录生活的点滴光芒。',
    url: 'https://innei.in/notes/160',
  },
  {
    year: 2022,
    title: '在绝望中前行',
    summary: '即使身处低谷，也要坚持向前。',
    url: 'https://innei.in/notes/136',
  },
  {
    year: 2021,
    title: '抉择、未知、迷茫、恐惧',
    summary: '面对人生的十字路口，勇敢做出选择。',
    url: 'https://year.innei.ren/2021/',
  },
  {
    year: 2020,
    title: '春华秋实',
    summary: '播种希望，收获成长。',
    url: 'https://year.innei.ren/2020/',
  },
  {
    year: 2019,
    title: '梦想和远方',
    summary: '怀揣梦想，踏上追寻远方的旅程。',
    url: 'https://year.innei.ren/2019/',
  },
]

async function fetchNoteData(noteId: string): Promise<NoteData | null> {
  try {
    const response = await fetch(
      `https://mx.innei.in/api/v2/notes/nid/${noteId}`,
    )
    if (!response.ok) {
      console.error(`Failed to fetch note ${noteId}: ${response.statusText}`)
      return null
    }

    const data = await response.json()
    if (!data?.data) {
      console.error(`Invalid data format for note ${noteId}`)
      return null
    }

    const textSize = new Blob([data.data.text || '']).size
    return {
      size: textSize,
      created: data.data.created,
      nid: data.data.nid,
    }
  } catch (error) {
    console.error(`Error fetching note ${noteId}:`, error)
    return null
  }
}

async function main() {
  console.log('开始获取 note 数据...\n')

  const results: Array<{ review: Review; data: NoteData | null }> = []

  for (const review of reviews) {
    const match = review.url.match(/innei\.in\/notes\/(\d+)/)
    if (!match) {
      console.log(`跳过 ${review.year}: 不是 innei.in/notes URL`)
      results.push({ review, data: null })
      continue
    }

    const noteId = match[1]
    console.log(`获取 ${review.year} (note ${noteId})...`)
    const data = await fetchNoteData(noteId)

    if (data) {
      const date = new Date(data.created)
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

      console.log(`  ✓ 大小: ${data.size} bytes`)
      console.log(`  ✓ 时间: ${month} ${day} ${hours}:${minutes}`)
    } else {
      console.log(`  ✗ 获取失败`)
    }

    results.push({ review, data })

    // 避免请求过快
    await new Promise((resolve) => setTimeout(resolve, 500))
  }

  console.log('\n=== 汇总 ===\n')
  results.forEach(({ review, data }) => {
    if (data) {
      const date = new Date(data.created)
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
      console.log(
        `${review.year}: ${data.size} bytes, ${month} ${day} ${hours}:${minutes}`,
      )
    } else {
      console.log(`${review.year}: 无数据`)
    }
  })
}

main().catch(console.error)
