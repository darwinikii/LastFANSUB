  import { useRouter } from "next/navigation";
  import dynamic from 'next/dynamic'
  
  const Image = dynamic(() => import('../components/Image'))
  
  export default function VolumeCard({ name, image, className, id, vol }) {
      const router = useRouter()
  
      function handleClick(e) {
        e.preventDefault()
        
        router.push("/novel/" + id + "/volume/" + vol)
      }
  
      return (
        <a href={"/novel/" + id + "/volume/" + vol} className={ (className ? className + " " : "") + "p-2 cursor-pointer w-28 lg:w-52 hover:bg-zinc-600/30 m-2 grid place-items-center top-0 justify-center border-b border-gray-300 from-zinc-200 lg:pb-6 lg:pt-8 backdrop-blur-2xl border-neutral-800 bg-zinc-800/30 from-inherit rounded-xl border bg-gray-200 lg:p-4 bg-zinc-800/30" }>
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
      </a>
      )
    }