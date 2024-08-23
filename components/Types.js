import dynamic from 'next/dynamic'
import Link from "next/link";
import { useState } from 'react';

const Image = dynamic(() => import('../components/Image'))

const randomColor = () => {
    var r = Math.floor(Math.random() * 256);
    var g = Math.abs(256 - r)
    var b = g + Math.floor(Math.random() * (r - g));

    return [r, g, b];
}

var color = randomColor();

export default function Types({ className }) {
    return (
        <div className={className}>
            <div className='flex rounded-3xl bg-white p-7' style={{backgroundColor: "#222"}}>
                <div className='flex xl:mr-12'>
                    <Image
                        desktopSrc="/covers/gachiakuta/main128x192.webp"
                        desktopSize={[128, 192]}
                        alt="Gachiakuta"
                        className="rounded-l-3xl mx-1"
                    />
                    <Image
                        desktopSrc="/covers/zombie100/main128x192.webp"
                        desktopSize={[128, 192]}
                        alt="Zombie 100"
                        className="rounded-r-3xl mx-1 hidden xl:block"
                    />
                </div>
                <div className='flex flex-col w-full items-center justify-between'>
                    <h1 className='text-2xl'>Manga</h1>
                    <Link className='text-md p-1 px-3 self-end border-2 rounded-3xl hover:shadow-xl link-shadow discover-button' href='/search?q=Manga'>
                        Keşfet
                    </Link>
                </div>
            </div>
            <div className='flex rounded-3xl bg-white p-7' style={{backgroundColor: "#222"}}>
                <div className='flex xl:mr-12'>
                    <Image
                        desktopSrc="/covers/mushoku-tensei/main128x192.webp"
                        desktopSize={[128, 192]}
                        alt="Mushoku Tensei"
                        className="rounded-l-3xl mx-1"
                    />
                    <Image
                        desktopSrc="/covers/you-zitsu/main128x192.webp"
                        desktopSize={[128, 192]}
                        alt="Zombie 100"
                        className="rounded-r-3xl mx-1 hidden xl:block"
                    />
                </div>
                <div className='flex flex-col w-full items-center justify-between'>
                    <h1 className='text-2xl'>Novel</h1>
                    <Link className='text-md p-1 px-3 self-end border-2 rounded-3xl hover:shadow-xl link-shadow discover-button' href='/search?q=Novel'>
                        Keşfet
                    </Link>
                </div>
            </div>

            <style>
                {`
                    .discover-button {
                       color: #FCD041;
                       border-color: #FCD041;
                    }

                    .discover-button:hover {
                       color: #FFFFFF;
                       background-color: #FCD041;
                    }
                `}
            </style>
        </div>
    )
}