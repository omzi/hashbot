'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ExternalLinkIcon } from 'lucide-react';
import { Button } from '#/components/ui/button';
import { Dialog, DialogContent, DialogHeader } from '#/components/ui/dialog';

interface ImportSuccessfulModalProps {
	isOpen: boolean;
	onOpenChange: () => void;
	profileLink: string;
	count: number;
	duration: number;
}

const ImportSuccessfulModal = ({
	isOpen,
	onOpenChange,
	profileLink,
	count,
	duration
}: ImportSuccessfulModalProps) => {
	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent showCloseButton={false} className='rounded-lg w-[calc(100%-20px)] sm:w-[24rem] md:w-[30rem]'>
				<DialogHeader className='mx-auto my-3 text-center'>
					<Image
						src='/images/blue-check.png'
						width={96}
						height={96}
						alt='Import successful!'
						fetchPriority='high'
					/>
				</DialogHeader>
				<h4 className='font-medium text-center text-[1.25rem]'>
					{count} {count === 1 ? 'post' : 'posts'} imported successfully!
				</h4>
				<p className='text-center text-muted-foreground'>Import was completed in {(duration / 1000).toFixed(2)} seconds.</p>
				<div className='flex items-center gap-6 p-4 mx-auto'>
					<Link onClick={onOpenChange} href={profileLink} target='_blank' rel='noopener noreferrer'>
						<Button>
							View Hashnode profile
							<ExternalLinkIcon className='w-4 h-4 ml-2' />
						</Button>
					</Link>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default ImportSuccessfulModal;
