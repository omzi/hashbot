/* eslint-disable @next/next/no-img-element */
'use client';

import Link from 'next/link';
import { toast } from 'react-toastify';
import { Button } from '#/components/ui/button';
import { ArrowDown, PenIcon, PlusIcon } from 'lucide-react';
import { useLoadDrafts } from '#/hooks/useLoadDrafts';
import DraftPostCard from '#/components/DraftPostCard';
import Navigation from '#/components/shared/Navigation';
import { useUser } from '#/components/contexts/UserContext';
import Image from 'next/image';

const Drafts = () => {
	const { user, draftsCount } = useUser();
	const { items, hasNext, loadMore, fetching } = useLoadDrafts(`${user?.username}.hashnode.dev`);
	const skeletonCount = items.length > 0 ? Math.min(6, draftsCount - items.length) : Math.min(6, draftsCount);

	const handleDeleteClick = () => {
		toast.info('Delete feature coming soon ;)');
	}

	const handlePublishClick = () => {
		toast.info('Publish feature coming soon ;)');
	}

	return (
		<Navigation>
			<div className='flex flex-col h-full px-4 py-6'>
				<div className='flex flex-col items-center justify-between gap-3 sm:flex-row'>
					<h1 className='text-2xl font-semibold'>Drafts ({draftsCount})</h1>
					<Link href='https://hashnode.com/draft' target='_blank'>
						<Button className='text-white bg-core hover:bg-blue-800' tabIndex={-1}>
							<PlusIcon className='w-4 h-4 mr-2' />
							New Draft
						</Button>
					</Link>
				</div>

				{draftsCount === 0 && (
					<div className='flex flex-col items-center justify-center mt-6 space-y-4 text-center'>
						<div className='hidden dark:block'>
							<Image
								src='/images/empty-state-dark.svg'
								height='300'
								width='300'
								alt='No draft found ;)'
								fetchPriority='high'
							/>
						</div>
						<div className='block dark:hidden'>
							<Image
								src='/images/empty-state-light.svg'
								height='300'
								width='300'
								alt='No draft found ;)'
								fetchPriority='high'
							/>
						</div>
						<h2 className='mx-4 text-xl text-muted-foreground'>No drafts, yet :). Get your creative juices flowing by clicking the button below.</h2>
						<Link href='/'>
							<Button className='transition-colors duration-300 bg-core hover:bg-blue-600' size='sm'>
								<PenIcon className='w-4 h-4 mr-2' />
								New Draft
							</Button>
						</Link>
					</div>
				)}

				<div className='grid grid-cols-1 gap-6 py-4 mt-4 lg:grid-cols-2 2xl:grid-cols-3'>
					{items.map((post, idx) => {
						const tags = post.tags?.map(tag => tag.name) as string[] || [];

						return (
							<DraftPostCard
								key={idx}
								id={post.id!}
								title={`${post.title}`}
								coverImage={post.coverImage?.url || '/images/placeholder.svg'}
								tags={tags}
								deleteHandler={handleDeleteClick}
								publishHandler={handlePublishClick}
							/>
						)
					})}

					{/* Add skeleton while loading... */}
					{fetching && Array.from({ length: skeletonCount }).map((_, idx) => <DraftPostCard.Skeleton key={idx} />)}

					{/* Show "Load More" button */}
					{!fetching && hasNext && (
						<div className='flex items-center justify-center h-20 col-span-full'>
							<Button className='text-white bg-core hover:bg-blue-800' onClick={loadMore}>
								<ArrowDown className='w-4 h-4 mr-2' />
								Load More
							</Button>
						</div>
					)}
				</div>
			</div>
		</Navigation>
	);
}

export default Drafts;
