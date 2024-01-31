import { createClient, errorExchange, fetchExchange } from 'urql';

const isServerSide = typeof window === 'undefined';
const [, token] = isServerSide ? [] : (document.cookie.match(/(?:^|; )token=([^;]*)/) || []);

const client = createClient({
  url: process.env.NEXT_PUBLIC_HASHNODE_GQL_ENDPOINT,
  exchanges: [
    errorExchange({
      onError(error) {
        console.error('A GQL error occurred :>>', { error });
      }
    }),
    fetchExchange
  ],
  fetchOptions: {
    headers: { Authorization: `Bearer ${token}` }
  }
});

export { client };
