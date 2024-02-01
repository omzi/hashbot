import { DevToArticle } from '#/common.types';
import { NextRequest, NextResponse } from 'next/server';
import { PublishPostMutation } from '#/graphql/mutations/PublishPost.gql';

export const runtime = 'edge';

const GQL_ENDPOINT = process.env.NEXT_PUBLIC_HASHNODE_GQL_ENDPOINT;

export const GET = async (req: NextRequest, res: NextResponse) => {
	const token = req.cookies.get('token')!.value;
  const username = req.nextUrl.searchParams.get('username');
	const publicationId = req.cookies.get('publicationId')!.value;

  if (!username) {
    return NextResponse.json({ message: 'DEV.to username not provided!' }, { status: 400 });
  }

  const articlesURL = `https://dev.to/api/articles?username=${username}`;

  try {
		const startTime = Date.now();
    const articlesResponse = await fetch(articlesURL);
    const articlesData = await articlesResponse.json() as { id: number; [key: string]: any }[];

    const articlePromises = articlesData.map(({ id }) => fetch(`https://dev.to/api/articles/${id}`).then(res => res.json()));
    const articleResponses = await Promise.all(articlePromises) as DevToArticle[];

		const hashnodePostPromises = articleResponses.map(article => {
      const tags = article.tags.map(tag => ({ name: tag, slug: tag }));

      return fetch(GQL_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        },
        body: JSON.stringify({
          query: `
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
          `,
          variables: {
            input: {
              tags,
              publicationId,
              title: article.title,
              subtitle: '',
              slug: article.slug,
              contentMarkdown: article.body_markdown,
              coverImageOptions: { coverImageURL: article.cover_image },
              disableComments: false,
              originalArticleURL: article.url,
              publishedAt: article.published_at,
              metaTags: { description: article.description, image: article.social_image, title: article.title },
              settings: { delisted: false, enableTableOfContent: true, isNewsletterActivated: false, slugOverridden: true },
            },
          },
        }),
      }).then(response => response.json());
    });

		const hashnodePostResponses = await Promise.all(hashnodePostPromises) as { data: PublishPostMutation, errors?: { message: string }[] }[];
		
		// Extract unique error messages
		const errorMessages = Array.from(new Set(hashnodePostResponses.flatMap(response => response.errors?.map(error => error.message)).filter(Boolean)));
		if (errorMessages.length > 0) {
			console.log('Error Messages :>>', errorMessages);
			return NextResponse.json({ message: 'Import failed!', errors: errorMessages }, { status: 500 });
		}

		const data = {
			count: articleResponses.length,
			duration: Date.now() - startTime
		}

    return NextResponse.json({ message: 'Import successful!', data }, { status: 200 });
  } catch (error) {
    console.log('Post Import Error [DEV.to]:>>', error);
    return NextResponse.json({ message: 'An error occurred while importing your DEV.to posts' }, { status: 500 });
  }
};
