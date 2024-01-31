import * as Types from '../types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetUserDraftsQueryVariables = Types.Exact<{
  host: Types.Scalars['String']['input'];
  nextCursor: Types.Scalars['String']['input'];
}>;


export type GetUserDraftsQuery = { __typename?: 'Query', publication?: { __typename?: 'Publication', drafts: { __typename?: 'DraftConnection', totalDocuments: number, pageInfo: { __typename?: 'PageInfo', hasNextPage?: boolean | null, endCursor?: string | null }, edges: Array<{ __typename?: 'DraftEdge', cursor: string, node: { __typename?: 'Draft', id: string, title?: string | null, updatedAt: any, coverImage?: { __typename?: 'DraftCoverImage', url: string } | null, tags: Array<{ __typename?: 'Tag', name: string, slug: string }> } }> } } | null };


export const GetUserDraftsDocument = gql`
    query GetUserDrafts($host: String!, $nextCursor: String!) {
  publication(host: $host) {
    drafts(first: 6, after: $nextCursor) {
      totalDocuments
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          coverImage {
            url
          }
          id
          title
          updatedAt
          tags {
            name
            slug
          }
        }
        cursor
      }
    }
  }
}
    `;

export function useGetUserDraftsQuery(options: Omit<Urql.UseQueryArgs<GetUserDraftsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetUserDraftsQuery, GetUserDraftsQueryVariables>({ query: GetUserDraftsDocument, ...options });
};