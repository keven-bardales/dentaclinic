/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        staleTimes: {
            dynamic: 0,
        }
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**'
            }
        ],
    },
 logging: {
    fetches: {
        fullUrl: true,
    }
    
 }
 
};

export default nextConfig;
