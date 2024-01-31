import { Draft } from '#/graphql/types';
import { useEffect, useMemo, useState } from 'react';
import { Prettify, RecursivePartial } from '#/common.types';
import { useGetUserDraftsQuery } from '#/graphql/queries/GetUserDrafts.gql';

export const useLoadDrafts = (host: string) => {
	const [items, setItems] = useState<Prettify<RecursivePartial<Draft>>[]>([]);
	const [nextCursor, setNextCursor] = useState('');

	const [{ data, fetching }] = useGetUserDraftsQuery({
		variables: {
			host,
			nextCursor
		}
	});

	const drafts = useMemo(() => data?.publication?.drafts.edges ?? [], [data]);

	useEffect(() => {
		if (data && drafts.length > 0) {
			setItems(previousItems => [...previousItems, ...drafts.map(({ node }) => node) as Prettify<RecursivePartial<Draft>>[]]);
		}
	}, [data, drafts]);

	const next = data?.publication?.drafts.pageInfo.hasNextPage;
	const loadMore = () => {
		if (next && data?.publication?.drafts.pageInfo.endCursor) {
			setNextCursor(data?.publication?.drafts.pageInfo.endCursor);
		}
	};

	return {
		items,
		hasNext: Boolean(next),
		loadMore,
		fetching
	};
};
