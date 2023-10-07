import { useRouter } from "next/navigation";
import Image from 'next/image'

export default function VolumeList({ name, image, className, id, vol }) {
    const router = useRouter()

    function handleClick(e) {
      e.preventDefault()
      
      router.push("/novel/" + id + "/volume/" + vol)
    }

    return (
      <div onClick={handleClick} className={ (className ? className + " " : "") + "cursor-pointer w-52 hover:bg-zinc-600/30 m-2 grid place-items-center fixed left-0 top-0 justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30" }>
      { image ? (
        <Image
        src={image}
        width={128}
        height={192}
        alt='Logo'
        className="mb-2"
      />
      ) : "" }
      <p>
        {name}
      </p>
    </div>
    )
  }