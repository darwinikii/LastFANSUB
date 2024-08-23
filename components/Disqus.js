"use client";
import { DiscussionEmbed } from 'disqus-react';
import { usePathname } from "next/navigation";

export default function Disqus({ className, style }) {
    const pathname = usePathname()

    return (
        <div className={className} style={style}>
            <DiscussionEmbed
            shortname='lastfansub'
            config={
                {
                    url: "https://lastfansub.vercel.app" + pathname,
                    identifier: pathname
                }
            }
            />
        </div>
    )
}