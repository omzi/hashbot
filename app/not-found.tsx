'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Home } from 'lucide-react';
import { Button } from '#/components/ui/button';

const NotFound = () => {
	return (
		<div className='flex flex-col items-center justify-center space-y-4 h-svh'>
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
			<h2 className='text-xl font-medium'>Page not found ;(</h2>
			<Link href='/'>
				<Button className='text-white transition-colors duration-300 bg-core hover:bg-blue-800' size='sm'>
					<Home className='w-4 h-4 mr-2' />
					Go home
				</Button>
			</Link>
		</div>
	)
}

export default NotFound;
