"use client";
import { Carousel } from 'react-responsive-carousel';
import "./carousel.css";
import Image from 'next/image'
import useSWR from "swr"

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function MangaReader({ id, chap }) {
    function useData(url) {
        const { data, error, isLoading } = useSWR(url, fetcher);

        return data
    }

    var mangaData = useData("/api/manga/" + id, (data) => data);
    var pages = useData("/api/manga/" + id + "/chapters/" + chap + "/pages");
    if (!pages) return <a>Yükleniyor..</a>
    else pages = pages["pages"]
    if (!mangaData) return <a>Yükleniyor..</a>
    var list = pages.map((page, index) => {
        return (
                <div className='flex h-full' key={index}>
                    <Image
                        priority={true}
                        src={"/pages/" + mangaData["shortname"] + "/" + page}
                        width={1115}
                        height={1600}
                        alt='Logo'
                        className='self-center'
                    />
                </div>
            )
    })
    
    

    return (
        <Carousel swipeable={true} emulateTouch={true} showThumbs={false} useKeyboardArrows={true} width="75%" showIndicators={false} className='flex justify-evenly'>
            {list}
        </Carousel>
    )
}