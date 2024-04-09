const { GraphQLError } = require("graphql");
const { PubSub } = require("graphql-subscriptions");
const BookMongo = require("./models/book");
const AuthorMongo = require("./models/author");
const Account = require("./models/user");
const pubsub = new PubSub();
const jsonwebtoken = require("jsonwebtoken");
const resolver = {
  Query: {
    me: async (_root: any, _args: any, context: any) => {
      return context.currentUser;
    },
    bookCount: async () => BookMongo.collection.countDocuments(),
    authorCount: () => AuthorMongo.collection.countDocuments(),
    allBooks: async (_root: any, args: { author: string; genre: string }) => {
      console.log("The genre: ", args.genre);
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
        console.log("SEVENTEEN THIRTY EIGHT IM LIKE WHATSUPHELLO");
        try {
          const bookslol = await BookMongo.find({ genres: args.genre });
          return bookslol;
          console.log(bookslol);
        } catch (error) {
          console.log(error);
          return null;
        }
      }

      return await BookMongo.find({});
    },
    allAuthors: async () => await AuthorMongo.find({}),
    allGenres: async () => await BookMongo.distinct("genres"),
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
      console.log("AYE BRUHV");
      console.log(_root, args, currentUser);
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

        pubsub.publish("BOOK_ADDED", { bookAdded: book });

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
      const user = new Account({
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
      const user = await Account.findOne({ username: args.username });

      if (user && args.password == "secret") {
        const userForToken = {
          username: user.username,
          id: user._id,
        };

        console.log("In login: ", userForToken);
        return {
          value: jsonwebtoken.sign(userForToken, process.env.JWT_SECRET),
        };
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
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator("BOOK_ADDED"),
    },
  },
};
module.exports = resolver;
