"use client";
import { DiscussionEmbed } from 'disqus-react';

export default function Disqus({ id }) {
    return (
        <div>
            <DiscussionEmbed
            shortname='lastfansub'
            config={
                {
                    url: "https://lastfansub.repl.co/",
                    identifier: id
                }
            }
            />
        </div>
    )
}