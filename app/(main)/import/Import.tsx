/* eslint-disable @next/next/no-img-element */
'use client';

import Link from 'next/link';
import { PlusIcon } from 'lucide-react';
import { Button } from '#/components/ui/button';
import Navigation from '#/components/shared/Navigation';

const Importer = () => {
	return (
		<Navigation>
			<div className='flex flex-col h-full px-4 py-6'>
				<div className='flex flex-col items-center justify-between gap-3 sm:flex-row'>
					<h1 className='text-2xl font-semibold'>Import Posts</h1>
					<Link href='https://hashnode.com/draft' target='_blank'>
						<Button className='text-white bg-core hover:bg-blue-800' tabIndex={-1}>
							<PlusIcon className='w-4 h-4 mr-2' />
							New Post
						</Button>
					</Link>
				</div>
			</div>
		</Navigation>
	);
}

export default Importer;
