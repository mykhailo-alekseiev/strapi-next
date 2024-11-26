/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: process.env.IMAGE_HOSTNAME || "localhost" }],
  },
  pageExtensions: ["ts", "tsx"],
  async redirects() {
    let redirects = [];

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/redirections`
      );
      const result = await res.json();
      const redirectItems = result.data.map(({ source, destination }) => {
        return {
          source: source,
          destination: destination,
          permanent: false,
        };
      });

      redirects = redirects.concat(redirectItems);

      return redirects;
    } catch (error) {
      return [];
    }
  },
};

export default nextConfig;
