import { DiscussionEmbed } from "disqus-react"

export default function Disqus({ className, identifier, title, url }) {
    const disqusShortname = "lastfansub"
    const disqusConfig = {
        url: url,
        identifier,
        title
      }

    return (
        <div id="disqus_thread" className={className}>
            <DiscussionEmbed
                shortname={disqusShortname}
                config={disqusConfig}
            />
        </div>
    )
}