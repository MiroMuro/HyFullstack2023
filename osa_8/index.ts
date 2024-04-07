const xd = "xd";
const jwt = require("jsonwebtoken");
const { ApolloServer } = require("@apollo/server");
const { GraphQLError } = require("graphql");
const { startStandaloneServer } = require("@apollo/server/standalone");
//const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
require("dotenv").config();
//const uuid = uuidv4();
const User = require("./models/User");
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
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author]
    me: User!
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

    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }
`;

const resolvers = {
  Query: {
    me: async (_root: any, _args: any, context: any) => {
      return context.currentUser;
    },
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
    addBook: async (
      _root: any,
      args: any,
      { currentUser }: { currentUser: any }
    ) => {
      if (!currentUser) {
        throw new GraphQLError("User not authenticated.", {
          extensions: {
            code: "Authenticate yourself first.",
          },
        });
      }
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
      args: { name: string; setBornTo: number },
      { currentUser }: { currentUser: any }
    ) => {
      if (!currentUser) {
        throw new GraphQLError("User not authenticated.", {
          extensions: {
            code: "Authenticate yourself first.",
          },
        });
      }
      try {
        const updatedAuthor = await AuthorMongo.collection.findOneAndUpdate(
          { name: args.name },
          { $set: { born: args.setBornTo } },
          { returnDocument: "after" }
        );
        if (!updatedAuthor) {
          throw new GraphQLError("Editing user failed. ", {
            extensions: {
              code: "BAD_USER_INPUT || AUTHOR_NOT_FOUND",
            },
          });
        }
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

    createUser: async (_root: any, args: any) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });

      try {
        await user.save();
        return user;
      } catch (error) {
        throw new GraphQLError("Creating an user failed. ", {
          extensions: {
            code: "INVALID ARGUMENTS",
            invalidArgs: args.name,
            error,
          },
        });
      }
    },
    login: async (_root: any, args: any) => {
      const user = await User.findOne({ username: args.username });

      if (user && args.password == "secret") {
        const userForToken = {
          username: user.username,
          id: user._id,
        };

        console.log("In login: ", userForToken);
        return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
      } else {
        throw new GraphQLError("Login failed!", {
          extensions: {
            code: "WRONG_CREDENTIALS",
            invalidArgs: args.name,
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
  context: async ({ req, _res }: { req: any; _res: unknown }) => {
    console.log(_res);
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.startsWith("bearer ")) {
      const decodedToken = jwt.verify(
        auth.substring(7),
        process.env.JWT_SECRET
      );
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
}).then(({ url }: { url: string }) => {
  console.log(`Server ready at ${url}`);
});
