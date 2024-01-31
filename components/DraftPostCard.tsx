/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { Card } from '#/components/ui/card';
import { Badge } from '#/components/ui/badge';
import { Button } from '#/components/ui/button';
import { Skeleton } from '#/components/ui/skeleton';
import { PenLineIcon, SendIcon, TrashIcon } from 'lucide-react';

interface DraftPostCardProps {
	id: string;
	title: string;
	tags: string[];
	coverImage: string;
	deleteHandler: () => void;
	publishHandler: () => void;
}

const DraftPostCard = ({
	id,
	title,
	tags,
	coverImage,
	deleteHandler,
	publishHandler
}: DraftPostCardProps) => {
	return (
		<Card className='relative overflow-hidden rounded-lg shadow-lg group' tabIndex={0}>
			<img
				alt='Cover image'
				className='object-cover aspect-[1600/840] w-full h-64'
				src={coverImage}
			/>
			<div className='absolute inset-0 bg-black/75'>
				<div className='p-6'>
					<h2 className='text-2xl font-bold text-white line-clamp-2'>{title}</h2>
					<div className='flex items-center mt-2 space-x-2'>
						{tags.map((tag, index) => (
							<span key={index} className='flex-shrink-0 inline-block px-2 py-1 text-xs font-medium text-gray-900 bg-white rounded-full select-none'>{tag}</span>
						))}
					</div>
				</div>
			</div>
			<Link href={`https://hashnode.com/drafts/${id}`} tabIndex={-1} target='_blank' className='absolute h-[10.5rem] inset-0 flex invisible transition-all duration-300 opacity-0 bg-black/50 group-hover:visible group-hover:opacity-100 group-focus:visible group-focus:opacity-100'>
				<div className='inline-block p-4 m-auto bg-white rounded-full'>
					<PenLineIcon className='w-6 h-6 text-black' />
				</div>
			</Link>
			<div className='absolute bottom-0 left-0 right-0 p-6 bg-white dark:bg-black'>
				<div className='flex items-center justify-between'>
					<Badge variant='secondary' className='text-sm font-medium uppercase'>Draft</Badge>
					<div className='flex gap-x-2'>
						<Button onClick={deleteHandler} className='flex rounded-full' variant='destructive' size='icon'>
							<TrashIcon className='w-5 h-5' />
						</Button>
						<Button onClick={publishHandler} className='flex rounded-full' variant='default' size='icon'>
							<SendIcon className='w-5 h-5' />
						</Button>
					</div>
				</div>
			</div>
		</Card>
	);
};

export default DraftPostCard;

DraftPostCard.Skeleton = function DraftPostCardSkeleton() {
	return (
		<Card className='relative overflow-hidden rounded-lg shadow-lg group'>
			<div className='w-full h-64 bg-gray-200' />
			<div className='absolute inset-0 bg-black/75'>
				<div className='p-6'>
					<Skeleton className='w-full rounded h-7' />
					<Skeleton className='w-full mt-2 rounded h-7' />
					<div className='flex items-center mt-2 space-x-2'>
						<Skeleton className='flex-shrink-0 inline-block w-24 h-6 rounded-full' />
						<Skeleton className='flex-shrink-0 inline-block h-6 rounded-full w-28' />
						<Skeleton className='flex-shrink-0 inline-block h-6 rounded-full w-14' />
					</div>
				</div>
			</div>

			<div className='absolute bottom-0 left-0 right-0 p-6 bg-white dark:bg-black'>
				<div className='flex items-center justify-between'>
					<Skeleton className='w-20 h-6 rounded-full' />
					<div className='flex gap-x-2'>
						<Skeleton className='w-10 h-10 rounded-full' />
						<Skeleton className='w-10 h-10 rounded-full' />
					</div>
				</div>
			</div>
		</Card>
	)
}
