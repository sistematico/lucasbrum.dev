export function Card({
  title,
  description
}: {
  title: string
  description: string
}) {
  return (
    <div className="mx-auto w-full rounded-md border border-black p-4">
      <div className="flex space-x-4">
        <div className="size-20 rounded-full bg-gray-200"></div>
        <div className="flex-1 space-y-6 py-1">
          {title}
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              {description}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
