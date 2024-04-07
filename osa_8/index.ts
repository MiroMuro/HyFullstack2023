const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
import { Book } from "./types";
//const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
require("dotenv").config();
//const uuid = uuidv4();
const BookMongo = require("./models/book");
const AuthorMongo = require("./models/author");

const MONGODB_URI = process.env.MONGODB_URI;

console.log("Connecting to MongoDB, URI: ", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connection established to MongoDB");
  })
  .catch((error: any) => {
    console.log("Error connecring to MongoDB: ", error.message);
  });

/*let authors = [
  {
    name: "Robert Martin",
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: "Martin Fowler",
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963,
  },
  {
    name: "Fyodor Dostoevsky",
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821,
  },
  {
    name: "Joshua Kerievsky", // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: "Sandi Metz", // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
];
*/
/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 *
 * Spanish:
 * Podría tener más sentido asociar un libro con su autor almacenando la id del autor en el contexto del libro en lugar del nombre del autor
 * Sin embargo, por simplicidad, almacenaremos el nombre del autor en conexión con el libro
 */

let books: Book[] = [
  {
    title: "Clean Code",
    published: 2008,
    author: "Robert Martin",
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Agile software development",
    published: 2002,
    author: "Robert Martin",
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ["agile", "patterns", "design"],
  },
  {
    title: "Refactoring, edition 2",
    published: 2018,
    author: "Martin Fowler",
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Refactoring to patterns",
    published: 2008,
    author: "Joshua Kerievsky",
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "patterns"],
  },
  {
    title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
    published: 2012,
    author: "Sandi Metz",
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "design"],
  },
  {
    title: "Crime and punishment",
    published: 1866,
    author: "Fyodor Dostoevsky",
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "crime"],
  },
  {
    title: "The Demon ",
    published: 1872,
    author: "Fyodor Dostoevsky",
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "revolution"],
  },
];

const typeDefs = `
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author]
  }
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book

    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`;

const resolvers = {
  Query: {
    bookCount: async () => BookMongo.collection.countDocuments(),
    authorCount: () => AuthorMongo.collection.countDocuments(),
    allBooks: async (_root: any, args: { author: string; genre: string }) => {
      if (args.author && args.genre) {
        try {
          const authorFind = await AuthorMongo.findOne({
            name: args.author,
          });
          if (!authorFind) {
            return [];
          }
          const booksFound = await BookMongo.find({
            genres: args.genre,
            author: authorFind._id,
          });
          return booksFound;
        } catch (error) {
          console.log(error);
          return null;
        }
      } else if (args.author) {
        console.log(args);
        try {
          const authorFind = await AuthorMongo.findOne({
            name: args.author,
          });
          return await BookMongo.find({ author: authorFind._id });
        } catch (error) {
          console.log(error);
          return null;
        }
      } else if (args.genre) {
        try {
          const bookslol = await BookMongo.find({ genres: args.genre });
          return bookslol;
        } catch (error) {
          console.log(error);
          return null;
        }
        return books.filter((book) => book.genres.includes(args.genre));
      }

      return await BookMongo.find({});
    },
    allAuthors: async () => await AuthorMongo.find({}),
  },
  Author: {
    bookCount: async (root: any) => {
      //The root may be an author or an book? Hence the if else
      if (root.name) {
        try {
          const author = await AuthorMongo.findOne({ name: root.name });
          const count = await BookMongo.collection.count({
            author: author._id,
          });
          return count;
        } catch (error) {
          console.log(error);
        }
      } else {
        const author = await AuthorMongo.findOne({ name: root.author.name });
        const count = await BookMongo.collection.count({ author: author._id });
        return count;
      }
    },
    id: (_root: any) => {
      return _root._id;
    },
  },
  Book: {
    author: async (_root: any, _args: any) => {
      //The root may be an Book or an author.
      if (!_root.author.name) {
        try {
          const xd = await AuthorMongo.findOne({ _id: _root.author });
          return xd;
        } catch (error) {
          console.log("Something went wrong mate");
        }
      } else {
        return _root.author;
      }
    },
  },
  Mutation: {
    addBook: async (_root: any, args: any) => {
      try {
        let author = await AuthorMongo.findOne({ name: args.author });
        if (!author) {
          author = new AuthorMongo({ name: args.author });
          //Existing author not found, Creating and saving new author,
          await author.save();
        }
        const book = new BookMongo({ ...args, author: author });

        await book.save();

        console.log("Book saved to DB");
        return book;
      } catch (error) {
        console.log("Error saving book");
      }
    },
    editAuthor: async (
      _root: any,
      args: { name: string; setBornTo: number }
    ) => {
      try {
        const updatedAuthor = await AuthorMongo.collection.findOneAndUpdate(
          { name: args.name },
          { $set: { born: args.setBornTo } },
          { returnDocument: "after" }
        );
        console.log("UPDATED AUTHOR: ", updatedAuthor);
        return updatedAuthor;
      } catch (error) {
        console.log(error);
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }: { url: String }) => {
  console.log(`Server ready at ${url}`);
});
