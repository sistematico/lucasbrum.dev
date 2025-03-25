// 'use client'

// import { ThemeProvider } from 'next-themes'
// import { AnimatePresence } from 'framer-motion'

// export function Providers({ children }: { children: React.ReactNode }) {
//   return (
//     <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
//       <AnimatePresence mode="wait">{children}</AnimatePresence>
//     </ThemeProvider>
//   )
// }

// 'use client'

// import { ThemeProvider } from 'next-themes'
// import { AnimatePresence } from 'framer-motion'
// import { YoutubeProvider } from '@/contexts/youtube-context'

// export function Providers({ children }: { children: React.ReactNode }) {
//   return (
//     <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
//       <YoutubeProvider>
//         <AnimatePresence mode="wait">{children}</AnimatePresence>
//       </YoutubeProvider>
//     </ThemeProvider>
//   )
// }

'use client'

import { ThemeProvider } from 'next-themes'
import { AnimatePresence } from 'framer-motion'
import { YoutubeProvider } from '@/contexts/youtube-context'
import { usePathname } from 'next/navigation'

export function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <YoutubeProvider>
        <AnimatePresence mode="wait" initial={false}>
          {/* Adicione uma chave baseada no caminho atual */}
          <div key={pathname}>{children}</div>
        </AnimatePresence>
      </YoutubeProvider>
    </ThemeProvider>
  )
}
