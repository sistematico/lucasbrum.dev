import { Suspense } from 'react'
import { GoogleAnalytics } from '@next/third-parties/google'
import localFont from 'next/font/local'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Providers } from '@/app/providers'
import { ProgressBar } from '@/components/progress'
// import { AudioProvider } from '@/contexts/audio'
import { PlayerProvider } from '@/contexts/audio'
import Player from '@/components/player'
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
        className={`${geistSans.variable} ${geistMono.variable} ${nunito.variable} antialiased flex items-center justify-center mx-auto h-full`}
      >
        <Providers>
          <PlayerProvider>
            <Suspense fallback={null}>
              <ProgressBar />
            </Suspense>
            <main className="flex flex-col flex-auto min-w-0 max-w-[720px] w-full space-y-5 my-10 mx-3 md:mx-0">
              <Header />
              <div className="page-content">
                {children}
                <Player />
              </div>
              {/* <Suspense fallback={null}>
              <PersistentYouTube />
              </Suspense> */}
              <Footer />
            </main>
          </PlayerProvider>
        </Providers>
        <GoogleAnalytics gaId="G-MXKM892NMZ" />
      </body>
    </html>
  )
}
