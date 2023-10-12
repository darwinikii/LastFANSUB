"use client";
import { useRouter } from "next/navigation";
import dynamic from 'next/dynamic'
import useSWR from "swr"

const VolumeCard = dynamic(() => import('/components/VolumeCard'))

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function VolumeList({ id }) {
  var { data, error, isLoading } = useSWR('/api/novel/' + id, fetcher);
  if (!data || isLoading) data = {
    genre: [],
    author: {
      name: undefined,
      URL: undefined
    },
    volumes: []
  }
  const router = useRouter()

  if (data && error != undefined) {
    alert("Hata oluştu lütfen bize bildir!")
    router.back()
  }

  const volumes = data.volumes.map((volume, index) =>
      <VolumeCard
        name={"Cilt " + volume.id}
        image={volume.image}
        id={data.id}
        key={data.id}
        vol={volume.id}
      />
    );

  return (
      <div>
        {volumes}
      </div>
    )
  }
