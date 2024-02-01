import convertToMarkdown from 'html-to-md';
import { MediumPost } from '#/common.types';
import { NextRequest, NextResponse } from 'next/server';
import { PublishPostMutation } from '#/graphql/mutations/PublishPost.gql';

export const runtime = 'edge';

const GQL_ENDPOINT = process.env.NEXT_PUBLIC_HASHNODE_GQL_ENDPOINT;

export const GET = async (req: NextRequest, res: NextResponse) => {
	const token = req.cookies.get('token')?.value || req.nextUrl.searchParams.get('token');
  const username = req.nextUrl.searchParams.get('username');
	const publicationId = req.cookies.get('publicationId')!.value;

  if (!username) {
    return NextResponse.json({ message: 'Medium username not provided!' }, { status: 400 });
  }

	// TODO: Parse Medium's RSS directly...
  const feedURL = `https://medium.com/@${username}/feed`;
  const articlesURL = `https://api.rss2json.com/v1/api.json?rss_url=${feedURL}`;

  try {
		const startTime = Date.now();
    const articlesResponse = await fetch(articlesURL);
    const articlesData = await articlesResponse.json() as { status: string; items: MediumPost[] };

		if (articlesData.status !== 'ok' ||  articlesData.items.length === 0) {
      return NextResponse.json({ message: 'No post found!', data: { count: 0, duration: 0 } }, { status: 200 });
    }

		const hashnodePostPromises = articlesData.items.map(article => {
			const cleanedContent = article.content.replaceAll('\n', '').replace(/<img[^>]*src="https:\/\/medium.com\/_\/stat[^>]*>\n?/gi, '');
			const [, coverImage] = cleanedContent.match(/<img[^>]*src="([^"]*)"[^>]*>/i) || [];
      const tags = article.categories.map(tag => ({ name: tag, slug: tag }));
			const markdownContent = convertToMarkdown(cleanedContent);

      return fetch(GQL_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`
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
              slug: new URL(article.link).pathname.replace('/', ''),
              contentMarkdown: markdownContent,
              coverImageOptions: { coverImageURL: article.thumbnail || coverImage },
              disableComments: false,
              originalArticleURL: article.link,
              publishedAt: new Date(article.pubDate).toISOString(),
              metaTags: { description: article.description, image: article.thumbnail || coverImage, title: article.title },
              settings: { delisted: false, enableTableOfContent: true, isNewsletterActivated: false, slugOverridden: true },
            }
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
			count: articlesData.items.length,
			duration: Date.now() - startTime
		}

    return NextResponse.json({ message: 'Import successful!', data }, { status: 200 });
  } catch (error) {
    console.log('Post Import Error [Medium]:>>', error);
    return NextResponse.json({ message: 'An error occurred while importing your Medium posts' }, { status: 500 });
  }
};
