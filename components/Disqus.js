import Script from "next/script";

export default function Disqus({ id }) {
    return (
        <div>
            <div id="disqus_thread"></div>
            <Script id="disqus-script">
            {`
                var disqus_config = function () {
                this.page.url = window.location.href;
                this.page.identifier = "novel${id}";
                };

                (function() {
                var d = document, s = d.createElement('script');
                s.src = 'https://lastfansub.disqus.com/embed.js';
                s.setAttribute('data-timestamp', +new Date());
                (d.head || d.body).appendChild(s);
                })();
            `}
            </Script>
            <noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
            <Script id="dsq-count-scr" src="//lastfansub.disqus.com/count.js" async></Script>
        </div>
    )
}