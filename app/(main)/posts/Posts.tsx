/* eslint-disable @next/next/no-img-element */
'use client';

import Link from 'next/link';
import { toast } from 'react-toastify';
import PostCard from '#/components/PostCard';
import { Button } from '#/components/ui/button';
import { ArrowDown, PlusIcon } from 'lucide-react';
import { useLoadPosts } from '#/hooks/useLoadPosts';
import Navigation from '#/components/shared/Navigation';
import { useUser } from '#/components/contexts/UserContext';

const Posts = () => {
	const { user, postsCount } = useUser();
	const { items, hasNext, loadMore, fetching } = useLoadPosts(`${user?.username}.hashnode.dev`);
	const skeletonCount = items.length > 0 ? Math.min(6, postsCount - items.length) : Math.min(6, postsCount);

	const handleShareClick = () => {
		toast.info('Share feature coming soon ;)');
	}

	return (
		<Navigation>
			<div className='flex flex-col h-full px-4 py-6'>
				<div className='flex flex-col items-center justify-between gap-3 sm:flex-row'>
					<h1 className='text-2xl font-semibold'>Posts ({postsCount})</h1>
					<Link href='https://hashnode.com/draft' target='_blank'>
						<Button className='text-white bg-core hover:bg-blue-800' tabIndex={-1}>
							<PlusIcon className='w-4 h-4 mr-2' />
							New Post
						</Button>
					</Link>
				</div>

				<div className='grid grid-cols-1 gap-6 py-4 mt-4 lg:grid-cols-2 2xl:grid-cols-3'>
					{items.map((post, idx) => {
						const tags = post.tags?.map(tag => tag.name) || [];

						return (
							<PostCard
								key={idx}
								title={`${post.title}`}
								coverImage={post.coverImage?.url || '/images/placeholder.svg'}
								tags={tags}
								date='25th January, 2024'
								isBookmarked={post.bookmarked || false}
								likeCount={post.reactionCount || 0}
								commentCount={post.responseCount || 0}
								shareHandler={handleShareClick}
								postLink={`${post.url}`}
							/>
						)
					})}

					{/* Add skeleton while loading... */}
					{fetching && Array.from({ length: skeletonCount }).map((_, idx) => <PostCard.Skeleton key={idx} />)}
					
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

export default Posts;
