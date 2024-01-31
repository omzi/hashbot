import dynamic from 'next/dynamic';
import type { Metadata } from 'next';

const Posts = dynamic(() => import('#/app/(main)/posts/Posts'), { ssr: false });

export const metadata: Metadata = {
	title: 'Posts ~ HashBot',
	description: 'Access your Hashnode posts and view or share them'
};

const Page = () => {
	return <Posts />;
};

export default Page;
