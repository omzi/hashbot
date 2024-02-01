import * as Types from '../types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type PublicationStatsQueryVariables = Types.Exact<{
  host: Types.Scalars['String']['input'];
}>;


export type PublicationStatsQuery = { __typename?: 'Query', publication?: { __typename?: 'Publication', id: string, drafts: { __typename?: 'DraftConnection', totalDocuments: number }, posts: { __typename?: 'PublicationPostConnection', totalDocuments: number } } | null };


export const PublicationStatsDocument = gql`
    query PublicationStats($host: String!) {
  publication(host: $host) {
    id
    drafts(first: 0) {
      totalDocuments
    }
    posts(first: 0) {
      totalDocuments
    }
  }
}
    `;

export function usePublicationStatsQuery(options: Omit<Urql.UseQueryArgs<PublicationStatsQueryVariables>, 'query'>) {
  return Urql.useQuery<PublicationStatsQuery, PublicationStatsQueryVariables>({ query: PublicationStatsDocument, ...options });
};