import { Post } from '#/graphql/types';
import { useEffect, useMemo, useState } from 'react';
import { Prettify, RecursivePartial } from '#/common.types';
import { useGetUserPostsQuery } from '#/graphql/queries/GetUserPosts.gql';

export const useLoadPosts = (host: string) => {
	const [items, setItems] = useState<Prettify<RecursivePartial<Post>>[]>([]);
	const [nextCursor, setNextCursor] = useState('');

	const [{ data, fetching }] = useGetUserPostsQuery({
		variables: {
			host,
			nextCursor
		}
	});

	const posts = useMemo(() => data?.publication?.posts.edges ?? [], [data]);

	useEffect(() => {
		if (data && posts.length > 0) {
			setItems(previousItems => [...previousItems, ...posts.map(({ node }) => node) as Prettify<RecursivePartial<Post>>[]]);
		}
	}, [data, posts]);

	const next = data?.publication?.posts.pageInfo.hasNextPage;
	const loadMore = () => {
		if (next && data?.publication?.posts.pageInfo.endCursor) {
			setNextCursor(data?.publication?.posts.pageInfo.endCursor);
		}
	};

	return {
		items,
		hasNext: Boolean(next),
		loadMore,
		fetching
	};
};
