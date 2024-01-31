import dynamic from 'next/dynamic';
import type { Metadata } from 'next';

const Import = dynamic(() => import('#/app/(main)/import/Import'), { ssr: false });

export const metadata: Metadata = {
	title: 'Import Posts ~ HashBot',
	description: 'Import posts from your DEV.to & Medium accounts into Hashnode'
};

const Page = () => {
	return <Import />;
};

export default Page;
