"use client"
import { useRouter } from "next/navigation";
import Search from '../components/Search'
import Image from 'next/image'

export default function Nav({ className }) {
  const router = useRouter();

  function handleMainMenuClick(e) {
    e.preventDefault()

    router.push("/")
  }

  return (
        <div className={className}>
            <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          <Image
            src="https://cdn.discordapp.com/icons/575367202132197377/90c325eb0dd35aebdf665019ae8903de.webp"
            width={48}
            height={48}
            alt='Logo'
          />
        </p>
        <p onClick={handleMainMenuClick} className="cursor-pointer fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Ana Menü
        </p>

        <Search className="fixed left-0 top-0 flex w-full justify-center lg:static lg:w-auto lg:p-4" />

        </div>
  )
}