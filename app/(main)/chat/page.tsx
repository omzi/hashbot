import dynamic from 'next/dynamic';
import type { Metadata } from 'next';

const Chat = dynamic(() => import('#/app/(main)/chat/Chat'), { ssr: false });

export const metadata: Metadata = {
	title: 'Chat ~ HashBot',
	description: 'Chat with our AI to perform actions on your Hashnode blog'
};

const Page = () => {
	return <Chat />;
};

export default Page;
