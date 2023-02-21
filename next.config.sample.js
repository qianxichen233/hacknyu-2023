/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        Geoapify_API_key: "",
        flight_API_key: "",
        BACKEND_BASEURL: "localhost:3000",
        amadeus_key: "",
        amadeus_secret: "",
        rapid_API_key: "",
    },
};

module.exports = nextConfig;
