import type React from 'react'
import type { Metadata, Viewport } from 'next'

import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geist = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: "年终总结 | Innei's Annual Review",
  description:
    '记录每一年的成长与思考 - 从 2019 到 2025，在代码与生活中寻找意义',
  keywords: [
    '年终总结',
    'annual review',
    'Innei',
    '程序员',
    '前端开发',
    '个人博客',
  ],
  authors: [{ name: 'Innei', url: 'https://innei.in' }],
  creator: 'Innei',
  icons: {
    icon: '/icon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    title: "年终总结 | Innei's Annual Review",
    description:
      '记录每一年的成长与思考 - 从 2019 到 2025，在代码与生活中寻找意义',
    siteName: "Innei's Annual Review",
  },
  twitter: {
    card: 'summary_large_image',
    title: "年终总结 | Innei's Annual Review",
    description:
      '记录每一年的成长与思考 - 从 2019 到 2025，在代码与生活中寻找意义',
  },
  robots: {
    index: true,
    follow: true,
  },
  generator: 'v0.app',
}

export const viewport: Viewport = {
  themeColor: '#fafafa',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={`${geist.variable} ${geistMono.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          themes={['github-light', 'github-dark', 'monokai', 'dracula', 'nord']}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
