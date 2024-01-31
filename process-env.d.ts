declare namespace NodeJS {
	interface ProcessEnv {
    [key: string]: string | undefined;
    NEXT_PUBLIC_HASHNODE_GQL_ENDPOINT: string;
    OPENAI_API_KEY: string;
    DEVTO_API_KEY: string;
  }
}
