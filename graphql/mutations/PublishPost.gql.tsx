import * as Types from '../types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type PublishPostMutationVariables = Types.Exact<{
  input: Types.PublishPostInput;
}>;


export type PublishPostMutation = { __typename?: 'Mutation', publishPost: { __typename?: 'PublishPostPayload', post?: { __typename?: 'Post', url: string, tags?: Array<{ __typename?: 'Tag', name: string, slug: string }> | null, coverImage?: { __typename?: 'PostCoverImage', url: string } | null, author: { __typename?: 'User', name: string, profilePicture?: string | null, username: string } } | null } };


export const PublishPostDocument = gql`
    mutation PublishPost($input: PublishPostInput!) {
  publishPost(input: $input) {
    post {
      url
      tags {
        name
        slug
      }
      coverImage {
        url
      }
      author {
        name
        profilePicture
        username
      }
    }
  }
}
    `;

export function usePublishPostMutation() {
  return Urql.useMutation<PublishPostMutation, PublishPostMutationVariables>(PublishPostDocument);
};