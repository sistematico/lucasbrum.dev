import { Nunito } from "next/font/google";
import { Navbar } from "@/components/nav";
import Footer from "@/components/footer";
import Rain from "@/components/rain";
import { ThemeProvider } from "@/components/theme";
import { LoadingProvider } from "@/hooks/use-loading";
import { metaData } from "@/config";
import type { Metadata } from "next";
import "@/styles/main.scss";

const nunito = Nunito({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(metaData.baseUrl),
  title: {
    default: metaData.title,
    template: `%s | ${metaData.title}`,
  },
  description: metaData.description,
  openGraph: {
    images: metaData.ogImage,
    title: metaData.title,
    description: metaData.description,
    url: metaData.baseUrl,
    siteName: metaData.name,
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: metaData.name,
    card: "summary_large_image",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${nunito.variable} bg-transparent`} suppressHydrationWarning>
      <head>
        <link
          rel="alternate"
          type="application/rss+xml"
          href="/rss.xml"
          title="RSS Feed"
        />
        <link
          rel="alternate"
          type="application/atom+xml"
          href="/atom.xml"
          title="Atom Feed"
        />
        <link
          rel="alternate"
          type="application/feed+json"
          href="/feed.json"
          title="JSON Feed"
        />
      </head>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LoadingProvider>
            <Rain />
            <main className="flex flex-col min-h-screen max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
            {/* <main className="flex flex-col min-h-screen max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8 z-10"> */}
              {/* <main className="flex flex-col flex-auto min-w-0 mt-2 md:mt-6 px-2 sm:px-3 md:px-0 max-w-[480px] w-full"> */}
              <Navbar />
              {children}
              <Footer />
              {/* <Analytics /> */}
              {/* <SpeedInsights /> */}
            </main>
          </LoadingProvider>          
        </ThemeProvider>
      </body>
    </html>
  );
}
