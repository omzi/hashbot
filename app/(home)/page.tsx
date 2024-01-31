import dynamic from 'next/dynamic';
import type { Metadata } from 'next';

const Home = dynamic(() => import('#/app/(home)/Home'), { ssr: false });

export const metadata: Metadata = {
	title: 'Home ~ HashBot',
	description: 'Your all-in-one solution for simplifying small business payments. ✨'
}

const Page = () => {
	return (
		<div className='h-full'>
			<Home />
		</div>
	);
};

export default Page;
