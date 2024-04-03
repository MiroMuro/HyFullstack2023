import { gql } from "@apollo/client";
const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
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
      id
    }
  }
`;
const CREATE_BOOK = gql`
  mutation (
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      author
      published
      genres
    }
  }
`;
const UPDATE_AUTHOR = gql`
  mutation ($name: String!, $born: Int!) {
    editAuthor(name: $name, setBornTo: $born) {
      name
      born
      bookCount
      id
    }
  }
`;
export { ALL_AUTHORS, ALL_BOOKS, CREATE_BOOK, UPDATE_AUTHOR };