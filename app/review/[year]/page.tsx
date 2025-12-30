import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ThemeSelector } from '@/components/theme-selector'

const reviewsData: Record<
  number,
  { title: string; content: string; date: string }
> = {
  2024: {
    title: '拥抱变化，持续成长',
    date: '2024-12-31',
    content: `## 序言

又是一年过去了。

坐在窗前，看着窗外的飘雪，回想这一年走过的路。有欢笑，有泪水，有迷茫，也有顿悟。

## 工作

今年最大的变化是工作上的转型。从传统的开发模式转向了更加敏捷的方式，学会了在不确定性中寻找确定性。

\`\`\`javascript
const growth = challenges.map(c => learn(c));
\`\`\`

每一个 bug 都是成长的机会，每一次 code review 都是学习的契机。

## 生活

生活中，我开始更加注重健康。养成了每天运动的习惯，虽然只是简单的跑步和拉伸，但坚持下来，身体状态明显好了很多。

## 阅读

今年读了 20 本书，最喜欢的是《原则》和《思考，快与慢》。

## 展望

新的一年，希望能够：

- 保持学习的热情
- 更加关注身体健康
- 多陪伴家人

---

> "每一个不曾起舞的日子，都是对生命的辜负。" — 尼采`,
  },
  2023: {
    title: '从0到1的突破',
    date: '2023-12-31',
    content: `## 回顾

2023 年，是充满挑战与突破的一年。

## 第一次

- 第一次独立负责一个完整项目
- 第一次在技术大会上做分享
- 第一次尝试写技术博客

每一个"第一次"都让我更加相信自己的可能性。

## 技术成长

深入学习了 React 和 TypeScript，开始接触 Rust。

\`\`\`rust
fn main() {
    println!("Hello, 2023!");
}
\`\`\`

## 感悟

突破舒适区是痛苦的，但成长从来不会在舒适区里发生。`,
  },
  2022: {
    title: '沉淀与思考',
    date: '2022-12-31',
    content: `## 特殊的一年

2022 年，世界依然动荡，但我学会了在混乱中保持内心的平静。

## 沉淀

有了更多独处的时间，开始写日记，记录每天的想法和感悟。

## 思考

重新审视了自己的价值观，什么是真正重要的？

- 健康
- 家人
- 持续学习

## 小结

外界越是喧嚣，内心越要安静。`,
  },
  2021: {
    title: '新的起点',
    date: '2021-12-31',
    content: `## 毕业

告别了学生时代，正式踏入社会。

## 第一份工作

作为应届生，一切都是新鲜的。

\`\`\`bash
$ cd /career
$ git init
$ git commit -m "first commit"
\`\`\`

## 感受

每一步都走得小心翼翼，却也充满期待。

## 感谢

感谢所有帮助过我的人，感谢自己没有放弃。`,
  },
}

export default async function ReviewPage({
  params,
}: {
  params: Promise<{ year: string }>
}) {
  const { year } = await params
  const yearNum = Number.parseInt(year)
  const review = reviewsData[yearNum]

  if (!review) {
    notFound()
  }

  const years = Object.keys(reviewsData)
    .map(Number)
    .sort((a, b) => b - a)
  const currentIndex = years.indexOf(yearNum)
  const prevYear = years[currentIndex + 1]
  const nextYear = years[currentIndex - 1]

  return (
    <main className="min-h-screen bg-background">
      <header className="px-6 py-8 max-w-2xl mx-auto border-b border-border">
        <Link
          href="/"
          className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2"
        >
          <span>{'<-'}</span>
          <span>cd ..</span>
        </Link>
      </header>

      <article className="px-6 py-12 max-w-2xl mx-auto">
        <div className="mb-8">
          <div className="font-mono text-xs text-muted-foreground mb-3 flex items-center gap-2">
            <span className="text-primary">$</span>
            <span>cat {year}.md</span>
          </div>
          <h1 className="text-2xl font-mono font-medium text-foreground mb-2">
            {review.title}
          </h1>
          <time className="font-mono text-xs text-muted-foreground">
            <span className="text-muted-foreground/50">#</span> {review.date}
          </time>
        </div>

        <div
          className="prose prose-sm max-w-none font-mono
          prose-headings:text-foreground prose-headings:font-medium
          prose-h2:text-lg prose-h2:mt-8 prose-h2:mb-4 prose-h2:border-b prose-h2:border-border prose-h2:pb-2
          prose-p:text-muted-foreground prose-p:leading-relaxed
          prose-a:text-primary prose-a:no-underline hover:prose-a:underline
          prose-strong:text-foreground
          prose-code:text-primary prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-xs prose-code:before:content-none prose-code:after:content-none
          prose-pre:bg-muted prose-pre:border prose-pre:border-border prose-pre:rounded-lg
          prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground prose-blockquote:italic
          prose-ul:text-muted-foreground prose-li:marker:text-primary
          prose-hr:border-border
        "
        >
          {review.content.split('\n').map((line, i) => {
            if (line.startsWith('## ')) {
              return <h2 key={i}>{line.slice(3)}</h2>
            }
            if (line.startsWith('> ')) {
              return (
                <blockquote key={i}>
                  <p>{line.slice(2)}</p>
                </blockquote>
              )
            }
            if (line.startsWith('- ')) {
              return <li key={i}>{line.slice(2)}</li>
            }
            if (line.startsWith('```')) {
              return null
            }
            if (line.startsWith('---')) {
              return <hr key={i} />
            }
            if (line.trim() === '') {
              return <br key={i} />
            }
            return <p key={i}>{line}</p>
          })}
        </div>

        <nav className="mt-16 pt-8 border-t border-border flex items-center justify-between font-mono text-xs">
          {prevYear ? (
            <Link
              href={`/review/${prevYear}`}
              className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
            >
              <span>{'<-'}</span>
              <span>{prevYear}</span>
            </Link>
          ) : (
            <span />
          )}

          {nextYear ? (
            <Link
              href={`/review/${nextYear}`}
              className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
            >
              <span>{nextYear}</span>
              <span>{'->'}</span>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </article>

      <footer className="px-6 py-8 max-w-2xl mx-auto flex items-center justify-between border-t border-border">
        <p className="text-xs text-muted-foreground font-mono">
          <span className="text-primary">#</span> INNEI ©{' '}
          {new Date().getFullYear()}
        </p>
        <ThemeSelector />
      </footer>
    </main>
  )
}
