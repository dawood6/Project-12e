const { ApolloServer, gql } = require("apollo-server-lambda");
const faunadb = require("faunadb"),
  q = faunadb.query;
const shortid = require("shortid");
const axios = require("axios");

const typeDefs = gql`
  type Query {
    getLollies: [lolly]
  }
  type lolly {
    id: ID!
    colorOne: String!
    colorTwo: String!
    colorThree: String!
    sender: String!
    reciever: String!
    message: String!
    link: String!
  }
  type Mutation {
    addLolly(
      colorOne: String!
      colorTwo: String!
      colorThree: String!
      sender: String!
      reciever: String!
      message: String!
    ): lolly
  }
`;
var client = new faunadb.Client({
  secret: process.env.FAUNADB_ADMIN_SECRET,
});

const resolvers = {
  Query: {
    getLollies: async (root, args, context) => {
      try {
        const result = await client.query(
          q.Map(
            q.Paginate(q.Match(q.Index("lolly"))),
            q.Lambda((x) => q.Get(x))
          )
        );
        console.log(result.data);

        return result.data.map((d) => {
          return {
            id: d.ts,
            colorOne: d.data.colorOne,
            colorTwo: d.data.colorTwo,
            colorThree: d.data.colorThree,
            reciever: d.data.reciever,
            sender: d.data.sender,
            message: d.data.message,
            link: d.data.link,
          };
        });
      } catch (err) {
        console.log(err);
      }
    },
  },
  Mutation: {
    addLolly: async (
      _,
      { colorOne, colorTwo, colorThree, sender, reciever, message }
    ) => {
      const result = await client.query(
        q.Create(q.Collection("virtualLolly"), {
          data: {
            colorOne,
            colorTwo,
            colorThree,
            sender,
            reciever,
            message,
            link: shortid.generate(),
          },
        })
      );
      const rebuild = await axios.post(process.env.HOOK);
      return result.data;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

exports.handler = server.createHandler();
