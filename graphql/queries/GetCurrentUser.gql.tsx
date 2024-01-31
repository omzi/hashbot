import * as Types from '../types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetCurrentUserQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { __typename?: 'Query', me: { __typename?: 'MyUser', username: string, profilePicture?: string | null, name: string, location?: string | null, id: string, dateJoined?: any | null, socialMediaLinks?: { __typename?: 'SocialMediaLinks', facebook?: string | null, github?: string | null, instagram?: string | null, linkedin?: string | null, stackoverflow?: string | null, twitter?: string | null, website?: string | null, youtube?: string | null } | null } };


export const GetCurrentUserDocument = gql`
    query GetCurrentUser {
  me {
    username
    socialMediaLinks {
      facebook
      github
      instagram
      linkedin
      stackoverflow
      twitter
      website
      youtube
    }
    profilePicture
    name
    location
    id
    dateJoined
  }
}
    `;

export function useGetCurrentUserQuery(options?: Omit<Urql.UseQueryArgs<GetCurrentUserQueryVariables>, 'query'>) {
  return Urql.useQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>({ query: GetCurrentUserDocument, ...options });
};