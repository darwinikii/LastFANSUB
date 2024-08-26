import dynamic from 'next/dynamic'
import Link from "next/link";
import './types.css'

const Image = dynamic(() => import('../components/Image'))

export default function Types({ className }) {
    return (
        <div className={className}>
            <div className='flex rounded-3xl bg-white p-7 types' style={{ backgroundColor: "#222" }}>
                <div className='flex w-full'>
                    <Image
                        desktopSrc="/covers/gachiakuta/main128x192.webp"
                        desktopSize={[128, 192]}
                        alt="Gachiakuta"
                        className="types-image rounded-l-3xl mx-1 ease-out duration-300"
                    />
                    <Image
                        desktopSrc="/covers/tsugihagi-darake/main128x192.webp"
                        desktopSize={[128, 192]}
                        alt="Zombie 100"
                        className="types-image rounded-r-3xl mx-1 ease-out duration-300 hidden xl:block"
                    />
                    <h1 className='text-2xl ml-2'>Manga</h1>
                    <div className='flex justify-end w-full'>
                        <Link className='text-md p-1 px-3 self-end border-2 rounded-3xl hover:shadow-xl link-shadow discover-button ease-out duration-300' href='/search?q=Manga'>
                            Keşfet
                        </Link>
                    </div>
                </div>
            </div>
            <div className='flex rounded-3xl bg-white p-7 types' style={{ backgroundColor: "#222" }}>
                <div className='flex w-full'>
                    <Image
                        desktopSrc="/covers/mushoku-tensei/main128x192.webp"
                        desktopSize={[128, 192]}
                        alt="Mushoku Tensei"
                        className="types-image rounded-l-3xl mx-1 ease-out duration-300"
                    />
                    <Image
                        desktopSrc="/covers/you-zitsu/main128x192.webp"
                        desktopSize={[128, 192]}
                        alt="Zombie 100"
                        className="types-image rounded-r-3xl mx-1 ease-out duration-300 hidden xl:block"
                    />
                    <h1 className='text-2xl ml-2'>Novel</h1>
                    <div className='flex justify-end w-full'>
                        <Link className='text-md p-1 px-3 self-end border-2 rounded-3xl hover:shadow-xl link-shadow discover-button ease-out duration-300' href='/search?q=Novel'>
                            Keşfet
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}