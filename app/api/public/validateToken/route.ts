import setUserData from '#/lib/actions/setUserData';
import { NextRequest, NextResponse } from 'next/server';
import { GetCurrentUserQuery } from '#/graphql/queries/GetCurrentUser.gql';
import { PublicationStatsQuery } from '#/graphql/queries/PublicationStats.gql';

export const runtime = 'edge';
const GQL_ENDPOINT = process.env.NEXT_PUBLIC_HASHNODE_GQL_ENDPOINT;

export const GET = async (req: NextRequest, res: NextResponse) => {
  let token;
	if (req.nextUrl.searchParams.get('token')) {
    token = req.nextUrl.searchParams.get('token');
  } else if (req.cookies.get('token')) {
    token = req.cookies.get('token')?.value;
  }

	if (!token) {
    return NextResponse.json({ message: 'Unauthenticated!' }, { status: 401 });
  }
  
  try {
    const gqlResponse = await fetch(GQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      },
      body: JSON.stringify({
        query: `query GetCurrentUser {
          me {
            username
            socialMediaLinks { facebook github instagram linkedin stackoverflow twitter website youtube }
            profilePicture
            name
            location
            id
            dateJoined
          }
        }`
      }),
    });

    const { data, errors } = await gqlResponse.json() as { data: GetCurrentUserQuery, errors?: any[] };

    if (errors) {
      console.error('GraphQL Request Error :>>', errors);
      return NextResponse.json({ message: 'Unauthenticated!' }, { status: 401 });
    }

    const statsResponse = await fetch(GQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      },
      body: JSON.stringify({
        query: `query PublicationStats {
          publication(host: "${data.me.username}.hashnode.dev") {
            drafts(first: 0) {
              totalDocuments
            }
            posts(first: 0) {
              totalDocuments
            }
          }
        }`
      })
    });

    const { data: statsData, errors: statsErrors } = await statsResponse.json() as { data: PublicationStatsQuery, errors?: any[] };

    if (statsErrors) {
      console.error('GraphQL Request Error :>>', statsErrors);
      return NextResponse.json({ message: 'Unauthenticated!' }, { status: 401 });
    }

    const postsCount = statsData.publication?.posts.totalDocuments || 0;
    const draftsCount = statsData.publication?.drafts.totalDocuments || 0;

    setUserData(token, data.me, postsCount, draftsCount);
    return NextResponse.json({ message: 'Authenticated', user: data.me }, { status: 200 });
  } catch (error) {
    console.log('Token Validation Error :>>', error);
    return NextResponse.json({ message: 'Unauthenticated!' }, { status: 401 });
  }
}
