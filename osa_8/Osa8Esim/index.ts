//import { Person } from "./types";
//const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { GraphQLError } = require("graphql");
import { gql } from "@apollo/client";
mongoose.set("strictQuery", false);
const PersonMongo = require("./models/person");
const User = require("./models/user");
require("dotenv").config();
console.log(PersonMongo);
const MONGODB_URI = process.env.MONGODB_URI;
import { typeDefs } from "./schema";
import { resolvers } from "./resolver.js";
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

//GraphQL palvelimen tulee määritellä resolverit jokaiselle skeemassa määritellyn
//tyypin kentälle.
//Olemme nyt määritelleet resolverit ainoastaan tyypin Query kentille, eli kaikille sovelluksen tarjoamille kyselyille.

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
