"use client";
import useSWR from 'swr';
import dynamic from 'next/dynamic'

const SerieCard = dynamic(() => import('../components/SerieCard'))
const fetcher = (url) => fetch(url, { next: { revalidate: 3600 } }).then((res) => res.json());

export default function Types({ className }) {
    var { data, error, isLoading } = useSWR('/api/newlyAdded/', fetcher);
    if (error) return <div>Hata</div>
    if (!data || isLoading) return <div></div>

    return (
        <div className={className} style={{backgroundColor: "#222"}}>
            <div className='flex w-full justify-center items-center text-3xl font-bold m-6'>
                <h1>Son Yüklenenler</h1>
            </div>
            <div className='grid grid-cols-1 xl:grid-cols-3'>
                {
                    data
                        .map((serie, index) => {
                            return <SerieCard
                                type={serie["type"]}
                                id={serie["id"]}
                                shortname={serie["shortname"]}
                                names={serie["names"]}
                                last={(serie["last"] || []).toReversed()}
                                timestamp={serie["updateTimestamp"]}
                                key={index + 1}
                            />
                        })
                }
            </div>
        </div>
    )
}