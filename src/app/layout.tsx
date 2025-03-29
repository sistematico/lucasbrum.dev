import { Suspense } from 'react'
import { YouTubeProvider, PersistentYouTube } from '@/providers/youtube'
import { GoogleAnalytics } from '@next/third-parties/google'
import localFont from 'next/font/local'
import { Navbar } from '@/components/nav'
import { Footer } from '@/components/footer'
import { Providers } from '@/app/providers'
import { ProgressBar } from '@/components/progress'
import { site } from '@/config'
import type { Metadata } from 'next'
import '@/styles/main.scss'

const nunito = localFont({
  src: '../fonts/nunito/nunito.woff2',
  variable: '--font-nunito-sans',
  display: 'swap'
})

const geistSans = localFont({
  src: '../fonts/geist/Geist-Regular.woff2',
  variable: '--font-geist-sans',
  display: 'swap'
})

const geistMono = localFont({
  src: '../fonts/geist_mono/GeistMono-Regular.woff2',
  variable: '--font-geist-mono',
  display: 'swap'
})

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
  openGraph: {
    type: 'website',
    url: site.url,
    title: site.title,
    description: site.description,
    siteName: site.title,
    images: [{ url: `${site.url}${site.ogImage}` }]
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.className} ${geistMono.className} ${nunito.className} antialiased flex items-center justify-center mx-auto h-full`}
      >
        <Providers>
          <YouTubeProvider>
            <Suspense fallback={null}>
              <ProgressBar />
            </Suspense>
            <main className="flex flex-col flex-auto min-w-0 max-w-[720px] w-full space-y-5 my-10 mx-3 md:mx-0">
              <Navbar />
              <div className="page-content">{children}</div>
              <PersistentYouTube />
              <Footer />
            </main>
          </YouTubeProvider>
        </Providers>
        <GoogleAnalytics gaId="G-MXKM892NMZ" />
      </body>
    </html>
  )
}
