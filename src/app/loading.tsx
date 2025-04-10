import { PageTransition } from '@/components/transition'

export default function RootLoading() {
  return (
    <PageTransition>
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    </PageTransition>
  )
}