import { createClient, errorExchange, fetchExchange } from 'urql';

const isServerSide = typeof window === 'undefined';

const client = createClient({
  url: process.env.NEXT_PUBLIC_HASHNODE_GQL_ENDPOINT,
  exchanges: [
    errorExchange({
      onError(error) {
        console.error('A GQL error occurred :>>', { error });
      },
    }),
    fetchExchange
  ],
  fetchOptions: () => {
    const [, token] = isServerSide ? [] : (document.cookie.match(/(?:^|; )token=([^;]*)/) || []);
    if (!token) return {};

    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  }
});

export { client };
