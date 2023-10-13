"use client";
import { DiscussionEmbed } from 'disqus-react';
import { usePathname } from "next/navigation";

export default function Disqus({ id }) {
    const pathname = usePathname()

    return (
        <div>
            <DiscussionEmbed
            shortname='lastfansub'
            config={
                {
                    url: "https://lastfansub.repl.co" + pathname,
                    identifier: pathname
                }
            }
            />
        </div>
    )
}