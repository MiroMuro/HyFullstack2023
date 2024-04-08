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
  query ($genre: String, $author: String) {
    allBooks(genre: $genre, author: $author) {
      title
      published
      author {
        name
        born
        id
      }
      genres
      id
    }
  }
`;
const GET_USER = gql`
  query {
    me {
      username
      favoriteGenre
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
      author {
        name
      }
      published
      genres
    }
  }
`;
const ALL_GENRES = gql`
  query {
    allGenres
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
const LOGIN = gql`
  mutation ($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;
export {
  ALL_AUTHORS,
  ALL_BOOKS,
  CREATE_BOOK,
  UPDATE_AUTHOR,
  LOGIN,
  ALL_GENRES,
  GET_USER,
};
