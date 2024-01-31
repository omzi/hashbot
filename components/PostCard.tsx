/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { cn } from '#/lib/utils';
import { Card } from '#/components/ui/card';
import { Button } from '#/components/ui/button';
import { Skeleton } from '#/components/ui/skeleton';
import { HeartIcon, MessageCircle, ForwardIcon, ExternalLink, BookmarkIcon } from 'lucide-react';

interface PostCardProps {
	title: string;
	tags: string[];
	date: string;
	isBookmarked: boolean;
	likeCount: number;
	commentCount: number;
	coverImage: string;
	shareHandler: () => void;
	postLink: string;
}

const PostCard = ({
	title,
	tags,
	date,
	isBookmarked,
	likeCount,
	commentCount,
	coverImage,
	shareHandler,
	postLink
}: PostCardProps) => {
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
					<p className='mt-2 text-sm font-medium text-white'>{date}</p>
				</div>
			</div>
			<Link href={postLink} target='_blank' tabIndex={-1} className='absolute h-[10.5rem] inset-0 flex invisible transition-all duration-300 opacity-0 bg-black/50 group-hover:visible group-hover:opacity-100 group-focus:visible group-focus:opacity-100'>
				<div className='inline-block p-4 m-auto bg-white rounded-full'>
					<ExternalLink className='w-6 h-6 text-black' />
				</div>
			</Link>
			<div className='absolute bottom-0 left-0 right-0 p-6 bg-white dark:bg-black'>
				<div className='flex items-center justify-between'>
					<div className='flex gap-x-2'>
						{/* Bookmarked */}
						<Button className={cn(
							'flex items-center text-gray-500 rounded-full pointer-events-none dark:text-gray-400',
							isBookmarked && 'text-white dark:text-white bg-red-600'
							)} variant='outline'>
							<BookmarkIcon className='w-5 h-5' />
						</Button>
						{/* Likes */}
						<Button className='flex items-center space-x-2 text-gray-500 rounded-full pointer-events-none dark:text-gray-400' variant='outline'>
							<HeartIcon className='w-5 h-5' />
							<span>{likeCount}</span>
						</Button>
						{/* Comments */}
						<Button className='flex items-center space-x-2 text-gray-500 rounded-full pointer-events-none dark:text-gray-400' variant='outline'>
							<MessageCircle className='w-5 h-5' />
							<span>{commentCount}</span>
						</Button>
					</div>

					<Button onClick={shareHandler} className='flex items-center text-gray-500 rounded-full dark:text-gray-400' variant='outline' size='icon'>
						<ForwardIcon className='w-5 h-5' />
					</Button>
				</div>
			</div>
		</Card>
	);
};

export default PostCard;

PostCard.Skeleton = function PostCardSkeleton() {
	return (
		<Card className='relative overflow-hidden rounded-lg shadow-lg group'>
			{/* <img
				alt='...'
				className='object-cover aspect-[1600/840] w-full h-64'
				src='/images/placeholder.svg'
				fetchPriority='high'
			/> */}
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
					<Skeleton className='w-1/2 h-5 mt-2 rounded' />
				</div>
			</div>

			<div className='absolute bottom-0 left-0 right-0 p-6 bg-white dark:bg-black'>
				<div className='flex items-center justify-between'>
					<Skeleton className='h-10 rounded-full w-52' />
					<Skeleton className='w-10 h-10 rounded-full' />
				</div>
			</div>
		</Card>
	)
}
