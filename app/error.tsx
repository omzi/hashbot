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
		<div className='flex flex-col items-center justify-center h-full space-y-4'>
			<div className='hidden dark:block'>
				<Image
					src='/images/error-dark.svg'
					height='400'
					width='400'
					alt='Error'
					fetchPriority='high'
				/>
			</div>
			<div className='block dark:hidden'>
				<Image
					src='/images/error-light.svg'
					height='400'
					width='400'
					alt='Error'
					fetchPriority='high'
				/>
			</div>
			<h2 className='text-xl font-medium'>Something went wrong!</h2>
			<Button variant='outline' size='sm' onClick={() => reset()}>
				<RotateCcw className='w-4 h-4 mr-2' />
				Try again?
			</Button>
			<Link href='/'>
				<Button className='transition-colors duration-300 bg-core hover:bg-blue-600' size='sm'>
					<Home className='w-4 h-4 mr-2' />
					Go home
				</Button>
			</Link>
		</div>
	)
}

export default Error;
