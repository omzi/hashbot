'use server';

import { cookies } from 'next/headers';
import { GetCurrentUserQuery } from '#/graphql/queries/GetCurrentUser.gql';

const setUserData = (
  token: string,
  user: GetCurrentUserQuery['me'],
  postsCount: number,
  draftsCount: number,
  publicationId: string
) => {
  cookies().set('token', token, { secure: true });
  cookies().set('user', JSON.stringify(user), { secure: true });
  cookies().set('postsCount', `${postsCount}`, { secure: true });
  cookies().set('draftsCount', `${draftsCount}`, { secure: true });
  cookies().set('publicationId', `${publicationId}`, { secure: true });
};

export default setUserData;
