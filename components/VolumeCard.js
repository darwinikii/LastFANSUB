import Link from 'next/link'
import dynamic from 'next/dynamic'

const Image = dynamic(() => import('../components/Image'))

export default function VolumeCard({ name, image, className, id, vol }) {
  return (
    <Link href={"/novel/" + id + "/volume/" + vol} className={className}>
      <Image
        priority="true"
        desktopSrc={image}
        desktopSize={[128, 192]}
        mobileSize={[64, 96]}
        alt='Logo'
        className="mb-2 md:w-32 md:h-48 w-16 h-24"
      />
      <p className="text-center">
        {name}
      </p>
    </Link>
  )
}