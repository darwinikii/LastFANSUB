"use client";
import { Carousel } from 'react-responsive-carousel';
import { setCookie as setValue, getCookie, hasCookie } from 'cookies-next';
import "./carousel.css";
import dynamic from 'next/dynamic'
import useSWR from "swr"

const Image = dynamic(() => import('../components/Image'))

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function MangaReader({ className, style, id, chap }) {
    function useData(url) {
        const { data, error, isLoading } = useSWR(url, fetcher);

        return data
    }

    function getValue(key, defaultValue) {
        return hasCookie(key) ? getCookie(key) : defaultValue
    }

    var mangaData = useData("/api/manga/" + id, (data) => data);
    var pages = useData("/api/manga/" + id + "/chapters/" + chap + "/pages");
    if (!pages) return <a>Yükleniyor..</a>
    else pages = pages["pages"]
    if (!mangaData) return <a>Yükleniyor..</a>

    var type = getValue("type", "Manga")

    if (type == "Manga") {
        var list = pages.map((page, index) => {
            return (
                <div className='' key={index}>
                    <Image
                        priority={true}
                        desktopSrc={"/pages/" + mangaData["shortname"] + "/" + chap + "/" + page}
                        desktopSize={[1115, 1600]}
                        mobileSize={[700, 1005]}
                        alt='Logo'
                        className='rounded-lg'
                    />
                </div>
            )
        })

        return (
            <div className={className} style={style}>
                <Carousel dynamicHeight={true} swipeable={true} emulateTouch={true} showThumbs={false} useKeyboardArrows={true} width="100%" showIndicators={false} className='flex justify-evenly w-screen'>
                    {list}
                </Carousel>
            </div>
        )
    } else if (type == "Webtoon") {
        var list = pages.map((page, index) => {
            return (
                <Image
                    key={index}
                    className='w-full h-auto'
                    desktopSrc={"/pages/" + mangaData["shortname"] + "/" + chap + "/" + page}
                    desktopSize={[1115, 1600]}
                    alt='Image'
                />
            )
        });

        return (
            <div className={className} style={style}>
                <div>
                    {list}
                </div>
            </div>
        )
    }
}