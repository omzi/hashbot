import { MetadataRoute } from 'next';

const manifest = (): MetadataRoute.Manifest => {
	return {
		name: 'HashBot',
		short_name: 'HashBot',
		description: 'An AI-powered, next-generation blogging experience redefined for Next.js',
		start_url: '/',
		display: 'standalone',
		background_color: '#000',
		theme_color: '#fff',
		icons: [
			{
				src: '/android-chrome-192x192.png',
				sizes: '192x192',
				type: 'image/png'
			},
			{
				src: '/android-chrome-512x512.png',
				sizes: '512x512',
				type: 'image/png'
			}
		]
	};
};

export default manifest;
