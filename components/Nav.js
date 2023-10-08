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
            <p onClick={handleMainMenuClick} className="cursor-pointer flex w-full justify-center lg:border:0 border-b border-gray-300 bg-gradient-to-b from-zinc-200 pt-2 pb-2 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl border lg:border-0 bg-gray-200 lg:bg-transparent lg:p-4 dark:bg-zinc-800/30">
          <Image
            src="/logo.png"
            width={140}
            height={100}
            alt='Logo'
          />
        </p>
        <p onClick={handleMainMenuClick} className="hidden lg:flex cursor-pointer fixed relative top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Ana Menü
        </p>

        <Search className="p-2 left-0 top-0 w-full justify-center lg:static lg:w-auto lg:p-4 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30" />

        </div>
  )
}