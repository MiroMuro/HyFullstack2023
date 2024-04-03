import { gql } from "@apollo/client";
const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;
const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      published
      author
      genres
    }
  }
`;
export { ALL_AUTHORS, ALL_BOOKS };
