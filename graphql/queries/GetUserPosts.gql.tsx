import * as Types from '../types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetUserPostsQueryVariables = Types.Exact<{
  host: Types.Scalars['String']['input'];
  nextCursor: Types.Scalars['String']['input'];
}>;


export type GetUserPostsQuery = { __typename?: 'Query', publication?: { __typename?: 'Publication', posts: { __typename?: 'PublicationPostConnection', totalDocuments: number, pageInfo: { __typename?: 'PageInfo', hasNextPage?: boolean | null, endCursor?: string | null }, edges: Array<{ __typename?: 'PostEdge', node: { __typename?: 'Post', bookmarked: boolean, id: string, reactionCount: number, responseCount: number, title: string, url: string, views: number, publishedAt: any, coverImage?: { __typename?: 'PostCoverImage', url: string } | null, tags?: Array<{ __typename?: 'Tag', name: string, slug: string }> | null } }> } } | null };


export const GetUserPostsDocument = gql`
    query GetUserPosts($host: String!, $nextCursor: String!) {
  publication(host: $host) {
    posts(first: 6, after: $nextCursor) {
      totalDocuments
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          bookmarked
          coverImage {
            url
          }
          id
          reactionCount
          responseCount
          title
          url
          views
          tags {
            name
            slug
          }
          publishedAt
        }
      }
    }
  }
}
    `;

export function useGetUserPostsQuery(options: Omit<Urql.UseQueryArgs<GetUserPostsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetUserPostsQuery, GetUserPostsQueryVariables>({ query: GetUserPostsDocument, ...options });
};