import { type Author } from "./author";

export type Post = {
  slug: string;
  title: string;
  date: string;
  coverImage: string;
  author: Author;
  excerpt: string;
  category?: string; // Optional category field
  hideCoverImage?: boolean; // Optional flag to hide cover image
  ogImage: {
    url: string;
  };
  content: string;
  preview?: boolean;
  extension?: 'md' | 'mdx'; // Added for file type tracking
};
