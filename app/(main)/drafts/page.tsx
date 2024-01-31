import dynamic from 'next/dynamic';
import type { Metadata } from 'next';

const Drafts = dynamic(() => import('#/app/(main)/drafts/Drafts'), { ssr: false });

export const metadata: Metadata = {
	title: 'Drafts ~ HashBot',
	description: 'Access your Hashnode drafts and publish or continue editing them'
};

const Page = () => {
	return <Drafts />;
};

export default Page;
