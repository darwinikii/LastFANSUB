"use client";
import Link from "next/link";
import dynamic from 'next/dynamic'

const Image = dynamic(() => import('../components/Image'))

export default function Nav({ className }) {

  return (
    <div className={className}>
      <Link href="/" className="w-full flex justify-center mb-4">
        <Image
          priority={true}
          desktopSrc={"/logo.png"}
          desktopSize={[160, 28]}
          alt='Logo'
        />
      </Link>

      <div className="w-full flex justify-center xl:justify-end items-center">
        <Link href="/search?q=+" className="text-white hover:underline mx-7">
          Seriler
        </Link>
        <Link href="/discord" className="text-white hover:underline mx-7">
          Discord
        </Link>
        <Link href="/crew" className="text-white hover:underline mx-7">
          Ekip
        </Link>
      </div>
    </div>
  )
}