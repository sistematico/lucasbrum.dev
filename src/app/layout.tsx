import { Suspense } from 'react'
import { RandomVideo } from '@/components/video'
import { YoutubeSkeleton } from '@/components/skeletons/youtube'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Nunito, Geist, Geist_Mono } from 'next/font/google'
import { Navbar } from '@/components/nav'
import { Footer } from '@/components/footer'
import { Providers } from '@/app/providers'
import { metaData } from '@/config'
import type { Metadata } from 'next'
import '@/styles/main.scss'

const nunito = Nunito({
  variable: '--font-nunito',
  subsets: ['latin']
})

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: metaData.title,
  description: metaData.description,
  icons: metaData.ogImage,
  openGraph: {
    type: "website",
    url: metaData.baseUrl,
    title: metaData.title,
    description: metaData.description,
    siteName: metaData.title,
    images: [{ url: `${metaData.baseUrl}${metaData.ogImage}` }]
  },
  
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
          <main className="flex flex-col flex-auto min-w-0 max-w-[640px] w-full space-y-5 my-10 mx-5 md:mx-0">
            <Navbar />
            {children}
            <Suspense fallback={<YoutubeSkeleton className="h-[400px]" />}>
        <RandomVideo />
      </Suspense>

            <Footer />
          </main>
        </Providers>
        <GoogleAnalytics gaId="G-MXKM892NMZ" />
      </body>
    </html>
  )
}
