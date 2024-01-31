import type { Metadata } from 'next';

import SignIn from '#/app/(auth)/sign-in/SignIn';

export const metadata: Metadata = {
	title: 'Sign In ~ HashBot',
	description: 'Sign in to HashBot using your token'
};

const Page = () => {
	return <SignIn />;
};

export default Page;
