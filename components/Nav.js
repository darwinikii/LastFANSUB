"use client";
import Link from "next/link";
import dynamic from 'next/dynamic'

const Search = dynamic(() => import('../components/Search'))
const Image = dynamic(() => import('../components/Image'))

export default function Nav({ className, searchValue }) {

  return (
        <div className={className}>
          <Link href="/" className="cursor-pointer flex w-full justify-center lg:border:0 border-b border-gray-300 from-zinc-200 pt-2 pb-2 backdrop-blur-2xl border-neutral-800 bg-zinc-800/30 from-inherit lg:static lg:w-auto  lg:rounded-xl border lg:border-0 bg-gray-200 lg:bg-transparent lg:p-4 bg-zinc-800/30">
            <Image
              priority={true}
              desktopSrc={"/logo.png"}
              desktopSize={[320, 160]}
              alt='Logo'
              className='w-40 h-20'
            />
          </Link>

          <Search defaultValue={searchValue} className="p-2 left-0 top-0 w-full justify-center lg:static lg:w-auto lg:p-4 flex w-full justify-center border-b border-gray-300 from-zinc-200 backdrop-blur-2xl border-neutral-800 bg-zinc-800/30 from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:bg-zinc-800/30" />

        </div>
  )
}