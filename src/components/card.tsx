import Image from 'next/image'

export function Card({
  title,
  description,
  image
}: {
  title: string
  description: string
  image?: string
}) {
  return (
    <div className="mx-auto w-full rounded-md border border-black p-4">
      <div className="flex space-x-4">
        {image
          ? <Image src={image} alt={title} width={50} height={50} className="rounded-full border-2 border-gray-200" />
          : <div className="size-20 rounded-full bg-gray-200"></div>
        }
        <div className="flex-1 space-y-6 py-1">
          {title}
          <div className="space-y-3 text-sm italic">
            {description}
            {/* <div className="text-sm"></div> */}
          </div>
        </div>
      </div>
    </div>
  )
}
