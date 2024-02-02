import { PersonaType } from '#/lib/utils';

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type RecursivePartial<T> = {
  [P in keyof T]?:
    T[P] extends (infer U)[] ? RecursivePartial<U>[] :
    T[P] extends object | undefined ? RecursivePartial<T[P]> :
    T[P];
};

export type SuccessResponse<T> = {
  message: string;
  data: T;
};

export type ErrorResponse = {
  message: string;
  errors?: string[];
};

export type ImportSource = 'DEV.to' | 'Medium' | 'Notion' | '';

export type DevToArticle = {
  id: number;
  title: string;
  description: string;
  readable_publish_date: string;
  slug: string;
  path: string;
  url: string;
  comments_count: number;
  public_reactions_count: number;
  collection_id: number | null;
  published_timestamp: string;
  positive_reactions_count: number;
  cover_image: string | null;
  social_image: string;
  canonical_url: string;
  created_at: string;
  edited_at: string | null;
  crossposted_at: string | null;
  published_at: string;
  last_comment_at: string;
  reading_time_minutes: number;
  tag_list: string;
  tags: string[];
  body_html: string;
  body_markdown: string;
  user: {
    name: string;
    username: string;
    twitter_username: string;
    github_username: string;
    user_id: number;
    website_url: string;
    profile_image: string;
    profile_image_90: string;
  };
  organization?: {
    name: string;
    username: string;
    slug: string;
    profile_image: string;
    profile_image_90: string;
  };
};

export type MediumPost = {
  title: string;
  pubDate: string;
  link: string;
  guid: string;
  author: string;
  thumbnail: string;
  description: string;
  content: string;
  enclosure: Record<string, any>;
  categories: string[];
};

export type SocialMedia = 'facebook' | 'twitter' | 'whatsapp' | 'telegram';

export type Persona = {
  name: string;
  description: string;
  short: string;
  introduction: string;
  avatar: string;
  attributes: string;
};

export type Personas = {
	[key in PersonaType]: Persona;
};
