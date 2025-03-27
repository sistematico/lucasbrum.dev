import { Suspense } from 'react'
import { YoutubeVideo, YoutubeSkeleton } from '@/components/youtube'
// import { GoogleAnalytics } from '@next/third-parties/google'
import localFont from 'next/font/local'
import { Geist, Geist_Mono } from 'next/font/google'
import { Navbar } from '@/components/nav'
import { Footer } from '@/components/footer'
import { Providers } from '@/app/providers'
import { LoadingIndicator } from '@/components/loading'
import { ProgressBar } from '@/components/progress-bar'
import { site } from '@/config'
import type { Metadata } from 'next'
import '@/styles/main.scss'

 
// Font files can be colocated inside of `app`
const nunito = localFont({
  src: '../fonts/nunito.woff2',
  variable: '--font-nunito',
  display: 'swap',
}) 

// const nunito = Nunito({
//   variable: '--font-nunito',
//   subsets: ['latin']
// })

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
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
        className={`${geistSans.variable} ${geistMono.variable} ${nunito.className} antialiased flex items-center justify-center mx-auto h-full`}
      >
        <Providers>
          <Suspense fallback={null}>
            <LoadingIndicator />
          </Suspense>

          <Suspense fallback={null}>
            <ProgressBar />
          </Suspense>
          <main className="flex flex-col flex-auto min-w-0 max-w-[720px] w-full space-y-5 my-10 mx-3 md:mx-0">
            <Navbar />
            <div className="page-content">{children}</div>
            <Suspense fallback={<YoutubeSkeleton className="h-[400px]" />}>
              <YoutubeVideo />
            </Suspense>
            <Footer />
          </main>
        </Providers>
        {/* <GoogleAnalytics gaId="G-MXKM892NMZ" /> */}
      </body>
    </html>
  )
}
