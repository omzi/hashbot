import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Logo: FC<{ newTab?: boolean }> = ({ newTab = false }) => {
	return (
		<Link href={'/'} target={newTab ? '_blank' : '_self'}>
			<Image
				src='/images/logo.png'
				height={32}
				width={32}
				alt='HashBot Logo'
			/>
		</Link>
	);
};

export default Logo;
