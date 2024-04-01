type Author = {
  name: string;
  id: string;
  born?: number;
};
type Book = {
  title: string;
  published: number;
  author: string;
  id: string;
  genres: string[];
};
export type { Author, Book };
