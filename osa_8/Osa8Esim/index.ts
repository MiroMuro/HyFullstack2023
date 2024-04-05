//import { Person } from "./types";
//const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { GraphQLError } = require("graphql");
mongoose.set("strictQuery", false);
const PersonMongo = require("./models/person");
const User = require("./models/user");
require("dotenv").config();
console.log(PersonMongo);
const MONGODB_URI = process.env.MONGODB_URI;

console.log("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    "connected to MongoDB";
  })
  .catch((error: any) => {
    console.log("error connection to MongoDB:", error.message);
  });

/*let persons: Person[] = [
  {
    name: "Arto Hellas",
    phone: "040-123543",
    street: "Tapiolankatu 5 A",
    city: "Espoo",
    id: "3d594650-3436-11e9-bc57-8b80ba54c431",
  },
  {
    name: "Matti Luukkainen",
    phone: "040-432342",
    street: "Malminkaari 10 A",
    city: "Helsinki",
    id: "3d599470-3436-11e9-bc57-8b80ba54c431",
  },
  {
    name: "Venla Ruuska",
    street: "Nallemäentie 22 C",
    city: "Helsinki",
    id: "3d599471-3436-11e9-bc57-8b80ba54c431",
  },
];
*/
const typeDefs = `
  enum YesNo {
    YES
    NO
  }

  type Address {
    street: String!
    city: String!
  }

  type Person {
    name: String!
    phone: String
    address: Address!
    id: ID!
  }

  type Query {
    personCount: Int!
    allPersons(phone: YesNo): [Person!]!
    findPerson(name: String!): Person
    me: User
  }

  type User {
    username: String!
    friends: [Person!]!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Mutation {
    addPerson(
      name: String!
      phone: String
      street: String!
      city: String!
    ): Person
    editNumber(
      name: String!
      phone: String!
    ): Person
    createUser(
      username: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
    addAsFriend(
      name: String!
    ): User
  }
`;
//GraphQL palvelimen tulee määritellä resolverit jokaiselle skeemassa määritellyn
//tyypin kentälle.
//Olemme nyt määritelleet resolverit ainoastaan tyypin Query kentille, eli kaikille sovelluksen tarjoamille kyselyille.
const resolvers = {
  Query: {
    personCount: async () => PersonMongo.collection.countDocuments(),
    allPersons: async (_root: any, _args: any) => {
      if (!_args.phone) {
        return PersonMongo.find({});
      }

      return PersonMongo.find({ phone: { $exists: _args.phone === "YES" } });
    },
    findPerson: async (_root: any, _args: any) =>
      PersonMongo.findOne({ name: _args.name }),
    me: async (_root: any, _args: any, context: any) => {
      return context.currentUser;
    },
  },
  Person: {
    address: (_root: any) => {
      return {
        street: _root.street,
        city: _root.city,
      };
    },
  },
  Mutation: {
    addPerson: async (_root: any, _args: any, context: any) => {
      const person = new PersonMongo({ ..._args });
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new GraphQLError("Not authenticated", {
          extentions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      try {
        await person.save();
        currentUser.friends = currentUser.friends.concat(person);
        await currentUser.save();
      } catch (error) {
        throw new GraphQLError("Saving person failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: _args.name,
            error,
          },
        });
      }
      return person;
    },
    editNumber: async (_root: any, _args: any) => {
      const person = await PersonMongo.findOne({ name: _args.name });
      person.phone = _args.phone;
      try {
        await person.save();
      } catch (error) {
        throw new GraphQLError("Saving number failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: _args.name,
            error,
          },
        });
      }
      return person;
    },
    createUser: async (_root: any, _args: any) => {
      const user = new User({ username: _args.username });
      try {
        await user.save();
      } catch (error) {
        throw new GraphQLError("Creating the user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: _args.name,
            error,
          },
        });
      }
      return user;
    },
    login: async (_root: any, _args: any) => {
      const user = await User.findOne({ username: _args.username });

      if (!user || _args.password !== "secret") {
        throw new GraphQLError("wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
    addAsFriend: async (
      root: any,
      args: any,
      { currentUser }: { currentUser: any }
    ) => {
      const nonFriendAlready = (person: any) =>
        !currentUser.friends
          .map((f: any) => f._id.toString())
          .includes(person._id.toString());

      if (!currentUser) {
        throw new GraphQLError("wrong credentials", {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }

      const person = await PersonMongo.findOne({ name: args.name });
      if (nonFriendAlready(person)) {
        currentUser.friends = currentUser.friends.concat(person);
      }

      await currentUser.save();

      return currentUser;
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
    //console.log("REQUEST: ", req);
    //console.log("RESPONSE: ", res);
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.startsWith("bearer ")) {
      const decodedToken = jwt.verify(
        auth.substring(7),
        process.env.JWT_SECRET
      );
      const currentUser = await User.findById(decodedToken.id).populate(
        "friends"
      );
      console.log("HERE");
      console.log("CURRENTUSER: ", currentUser);
      return { currentUser };
    }
  },
}).then(({ url }: { url: string }) => {
  console.log(`Server ready at ${url}`);
});
