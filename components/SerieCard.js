import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useState } from 'react'

const Image = dynamic(() => import('../components/Image'))

function timeDifference(current, previous) {
  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;

  var elapsed = current - previous;

  if (elapsed < msPerMinute) {
    return Math.round(elapsed / 1000) + ' saniye';
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + ' dakika';
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + ' saat';
  } else if (elapsed < msPerMonth) {
    return Math.round(elapsed / msPerDay) + ' gün';
  } else if (elapsed < msPerYear) {
    return Math.round(elapsed / msPerMonth) + ' ay';
  } else {
    return Math.round(elapsed / msPerYear) + ' yıl';
  }
}

export default function Card({ names, shortname, id, type, last, timestamp, key }) {
  return (
    <Link
      className="flex items-center w-full p-5"
      href={type == "Novel" ? "/novel/" + id : (type == "Manga" ? "/manga/" + id : "/not-found")}
    >
      <Image
        priority={true}
        desktopSrc={"/covers/" + shortname + "/main128x192.webp"}
        mobileSrc={"/covers/" + shortname + "/main128x192.webp"}
        desktopSize={[128, 192]}
        mobileSize={[96, 144]}
        alt='Logo'
        className="mx-3 xl:mx-5 rounded-lg"
      />
      <div className='flex flex-col w-full h-full justify-between overflow-hidden'>
        <div className='flex flex-col'>
          <h2 className='text-xl font-semibold hover:underline truncate ...'>
            {names[0]}
          </h2>
          <div className='grid mb-2 xl:mb-0'>
            {
              last ?
                (
                  last
                  .map((e, i) => (<Link
                    className={'flex justify-between text-sm font-medium text-black p-1 rounded-xl my-0.5' + (i >= 3 ? ' hidden xl:flex' : "")}
                    key={i}
                    href={type == "Novel" ? `/novel/${id}/volume/${e["volume"]}/chapter/${e["chapter"]}` : (type == "Manga" ? `/manga/${id}/chapter/${e["chapter"]}` : "/not-found")}
                    style={{ backgroundColor: "#FCD041" }}>
                    {type == "Novel" ? `Cilt ${e["volume"]} Bölüm ${e["chapter"]}` : (type == "Manga" ? `Bölüm ${e["chapter"]}` : "")}
                    <span className='mx-0.5'>
                      {timeDifference(Date.now(), e["timestamp"])}
                    </span>
                  </Link>
                  ))
                ) :
                (<h3 className='text-lg font-medium'>
                  {type}
                </h3>)
            }
          </div>
        </div>
        {
          last ? (
            <div className='flex justify-between'>
              <span>{timeDifference(Date.now(), timestamp) + " önce"}</span>
              <span>
                {type}
              </span>
            </div>
          ) : null
        }
      </div>
    </Link>
  )
}