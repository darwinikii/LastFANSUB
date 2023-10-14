"use client";
import { useRouter } from "next/navigation";
import Image from 'next/image'

export default function Card({ name, image, className, id, type }) {
    const router = useRouter()

    function handleClick(e) {
      e.preventDefault()
      
      if (type == "Novel") {
        router.push("/novel/" + id)
      } else if (type == "Manga") {
        router.push("/manga/" + id)
      }
    }

    return (
      <div onClick={handleClick} className={ (className ? className + " " : "") + "p-2 cursor-pointer w-28 lg:w-52 hover:bg-zinc-600/30 m-2 grid place-items-center top-0 justify-center border-b border-gray-300 from-zinc-200 lg:pb-6 lg:pt-8 backdrop-blur-2xl border-neutral-800 bg-zinc-800/30 from-inherit rounded-xl border bg-gray-200 lg:p-4 bg-zinc-800/30" }>
      { image ? (
        <Image
        priority={true}
        src={image}
        width={128}
        height={192}
        alt='Logo'
        className="mb-2 md:w-32 md:h-48 w-16 h-24"
        />
      ) : "" }
      <p className="text-center	">
        {name}
        <h3 className="ml-1 mt-2 text-2xs lg:text-sm font-medium text-gray-300">{"(" + type + ")"}</h3>
      </p>
    </div>
    )
  }