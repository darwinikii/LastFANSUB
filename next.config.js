const withPWA = require('next-pwa')
  
module.exports = withPWA({
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable:process.env.NODE_ENV === 'development'
})({
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "*"
            },
            {
                protocol: "http",
                hostname: "*"
            }
        ],
        unoptimized: true,
    },
    experimental: {
        nextScriptWorkers: true,
    },
})