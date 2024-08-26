"use client";
import dynamic from 'next/dynamic'
import useSWR from "swr"

const VolumeCard = dynamic(() => import('/components/VolumeCard'))

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function VolumeList({ className, id }) {
  var { data, error, isLoading } = useSWR(`/api/novel/${id}/volume/fetch`, fetcher);
  if (error) return <div>Hata</div>
  if (!data || isLoading) return <div>Yükleniyor</div>

  const volumes = data.map((volume, index) =>
      <VolumeCard
        name={"Cilt " + volume.id}
        image={volume.image}
        id={id}
        key={index}
        vol={volume.id}
        className="flex flex-col items-center rounded-3xl p-5 ease-out duration-300 hover:bg-zinc-900"
      />
    );

  return (
      <div className={className}>
        {volumes}
      </div>
    )
  }
