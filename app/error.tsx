'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Home, RotateCcw } from 'lucide-react';
import { FC, useEffect } from 'react';
import { Button } from '#/components/ui/button';

type ErrorProps = {
	error: Error & { digest?: string }
	reset: () => void // Attempt to recover by trying to re-render the segment
}

const Error: FC<ErrorProps> = ({ error, reset }) => {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error('A fatal error occurred :>>', error);
	}, [error]);

	return (
		<div className='h-full flex flex-col items-center justify-center space-y-4'>
			<Image
				src='/images/error.svg'
				height='400'
				width='400'
				alt='Error'
				priority={true}
			/>
			<h2 className='text-xl font-medium'>Something went wrong!</h2>
			<Button variant='outline' size='sm' onClick={() => reset()}>
				<RotateCcw className='mr-2 w-4 h-4' />
				Try again?
			</Button>
			<Link href='/'>
				<Button className='bg-core hover:bg-blue-600 transition-colors duration-300' size='sm'>
					<Home className='mr-2 w-4 h-4' />
					Go home
				</Button>
			</Link>
		</div>
	)
}

export default Error;
