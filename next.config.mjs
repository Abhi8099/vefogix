/** @type {import("next").NextConfig} */
const nextConfig = {

  trailingSlash: true,

  images: {
    domains: [
      "localhost",
      "api.microlink.io",
      'vefogix.com'
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: ""
      },
      {
        protocol: "https",
        hostname: "vefogix.com",
        port: ""
      },
      {
        protocol: "https",
        hostname: "vefogix.comundefined",
        port: ""
      },
      {
        protocol: "https",
        hostname: "mma.prnewswire.com",
        port: ""
      },
      {
        protocol: "https",
        hostname: "www.google.com",
        port: ""
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: ""
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: ""
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: ""
      },
      {
        protocol: "https",
        hostname: "dashboard.kingnewswire.com",
        port: ""
      },
      {
        protocol: "https",
        hostname: "w7.pngwing.com",
        port: ""
      },
      {
        protocol: "https",
        hostname: "fullforms.com",
        port: ""
      },
      {
        protocol: "https",
        hostname: "miro.medium.com",
        port: ""
      },
      {
        protocol: "https",
        hostname: "bizzsight.com",
        port: ""
      },
      {
        protocol: "https",
        hostname: "static.wikia.nocookie.net",
        port: ""
      },
      {
        protocol: "https",
        hostname: "cdn4.iconfinder.com",
        port: ""
      },

      {
        protocol: "https",
        hostname: "nationalinsightnews.com",
        port: ""
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        port: ""
      },
      {
        protocol: "https",
        hostname: "img1.wsimg.com",
        port: ""
      },
      {
        protocol: "https",
        hostname: "pub-b7fd9c30cdbf439183b75041f5f71b92.r2.dev",
        port: ""
      }
    ]
  },
};

export default nextConfig;
