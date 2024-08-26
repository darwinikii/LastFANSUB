import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'

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

export default function Card({ names, shortname, id, type, lastChapters, key }) {
  const router = useRouter()

  return (
    <Link
      href={(type == 0 ? "/novel/" + id : (type == 1 ? "/manga/" + id : "/not-found"))}
      className="flex items-center w-full p-5 cursor-pointer xl:m-2 rounded-3xl ease-out duration-300 hover:bg-zinc-900"
    >
      <Image
        priority={true}
        desktopSrc={"/covers/" + shortname + "/main128x192.webp"}
        mobileSrc={"/covers/" + shortname + "/main128x192.webp"}
        desktopSize={[128, 192]}
        mobileSize={[96, 144]}
        alt='Logo'
        className="mr-3 xl:mr-5 rounded-lg"
      />
      <div className='flex flex-col w-full h-full justify-between overflow-hidden'>
        <div className='flex flex-col'>
          <h2 className='text-xl font-semibold hover:underline truncate ...'>
            {names[0]}
          </h2>
          <div className='grid mb-2 xl:mb-0'>
            {
              lastChapters ?
                (
                  lastChapters
                  .map((e, i) => (<button
                    className={'chapter-item flex justify-between text-sm font-medium text-black p-1 rounded-xl my-0.5 cursor-pointer ease-out duration-300' + (i >= 3 ? ' hidden xl:flex' : "")}
                    key={i}
                    href={(type == 0 ? `/novel/${id}/volume/${e["volume"]}/chapter/${e["chapter"]}` : (type == 1 ? `/manga/${id}/chapter/${e["chapter"]}` : "/not-found"))}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      router.push(e.currentTarget.attributes.getNamedItem('href').value);
                    }}>
                    {type == 0 ? `Cilt ${e["volume"]} Bölüm ${e["chapter"]}` : (type == 1 ? `Bölüm ${e["chapter"]}` : "")}
                    <span className='mx-0.5'>
                      {timeDifference(Date.now(), e["timestamp"])}
                    </span>
                  </button>
                  ))
                ) :
                (<h3 className='text-lg font-medium'>
                  {type == 0 ? "Novel" : (type == 1 ? "Manga" : "")}
                </h3>)
            }
          </div>
        </div>
        {
          lastChapters ? (
            <div className='flex justify-between'>
              <span>{timeDifference(Date.now(), lastChapters[0]["timestamp"]) + " önce"}</span>
              <span>
                {type == 0 ? "Novel" : (type == 1 ? "Manga" : "")}
              </span>
            </div>
          ) : null
        }
      </div>
    </Link>
  )
}