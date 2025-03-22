// import type { NextConfig } from "next";

import { Images } from "lucide-react"

// const nextConfig: NextConfig = {
// 	/* config options here */
// 	images: {
// 		domains: ["i.postimg.cc", "res.cloudinary.com", "example.com"],
// 	},
// };

// export default nextConfig;
/**@type {import("next").NextConfig}*/
const nextConfig = {
	reactStrictMode: true,
	Images: {
		domains: ["res.cloudinary.com"],
	},
};

module.exports = nextConfig;
