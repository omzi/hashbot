/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		missingSuspenseWithCSRBailout: false
	},
	skipMiddlewareUrlNormalize: true
};

module.exports = nextConfig;
