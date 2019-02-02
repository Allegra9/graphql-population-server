const { GraphQLServer } = require("graphql-yoga");
const fetch = require("node-fetch");

const baseURL = `http://api.population.io/1.0/`;
const countriesURL = `https://countries.trevorblades.com/`;

const resolvers = {
  Query: {
    popGrowthPerDay: (_, { country }) => {
      console.log("COUNTRY: ", country);
      return fetch(`${baseURL}/population/${country}/today-and-tomorrow/`)
        .then(res => res.json())
        .then(
          data =>
            data.total_population[1].population -
            data.total_population[0].population
        );
    }
  }
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
