const { ApolloServer } = require("@apollo/server");
const { GraphQLError } = require("graphql");
const { startStandaloneServer } = require("@apollo/server/standalone");
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
      if (args.author.length < 4) {
        throw new GraphQLError("Bad user input!", {
          extensions: {
            code: "Author name too short!",
          },
        });
      }
      if (args.title.length < 5) {
        throw new GraphQLError("Bad user input!", {
          extensions: {
            code: "Book title too short!",
          },
        });
      }
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
        throw new GraphQLError("Creating book failed! ", {
          extensions: {
            code: "Bad user input.",
            error,
          },
        });
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
        throw new GraphQLError("Editing user failed. ", {
          extensions: {
            code: "BAD_USER_INPUT || AUTHOR_NOT_FOUND",
          },
        });
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
