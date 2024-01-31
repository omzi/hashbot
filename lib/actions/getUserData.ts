'use server';

import { cookies } from 'next/headers';
import { safeParseJSON } from '#/lib/utils';
import { GetCurrentUserQuery } from '#/graphql/queries/GetCurrentUser.gql';

const getUserData = () => {
  const token = cookies().get('token')?.value ?? '';
  const user = safeParseJSON<GetCurrentUserQuery['me']>(cookies().get('user')?.value ?? '');

  return { token, user };
};

export default getUserData;
