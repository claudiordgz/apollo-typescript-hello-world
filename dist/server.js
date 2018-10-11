"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const graphql_tools_1 = require("graphql-tools");
const mocks_1 = require("./mocks");
const lodash_1 = require("lodash");
const bookingSchema = graphql_tools_1.makeExecutableSchema({
    typeDefs: apollo_server_1.gql `
  type Booking {
    id: String!
    name: String!
    Company: String!
    Location: String!
    Lead: String
  }

  type Query {
    getBooking(id: String): Booking
    getBookings: [Booking]
  }

  input IBooking {
    name: String!
    Company: String!
    Location: String!
    Lead: String
  }

  type Mutation {
    createBooking(booking: IBooking): Booking
  }
`
});
const typeDefs = graphql_tools_1.makeExecutableSchema({
    typeDefs: apollo_server_1.gql `
  type Lead {
    id: String!
    firstName: String!
    lastName: String!
  }

  type Location {
    id: String!
    name: String!
    Company: String!
  }

  type Company {
    id: String!
    name: String!
  }

  type Query {
    getCompany(id: String): Company
    getCompanies: [Company]
    getLocation(id: String): Location
    getLocations: [Location]
    getLead(id: String): Lead
    getLeads: [Lead]
  }

  input ICompany {
    name: String!
    Company: String!
  }

  type Mutation {
    createCompany(company: ICompany): Company
  }
`
});
function getById(collection, id) {
    return lodash_1.find(collection, { id });
}
const getByIdResolver = (collection) => (root, { id }, context) => getById(collection, id);
const resolvers = {
    Query: {
        getBookings: (root, args, context) => mocks_1.mockBookings,
        getCompanies: (root, args, context) => mocks_1.mockCompanies,
        getLocations: (root, args, context) => mocks_1.mockLocations,
        getLeads: (root, args, context) => mocks_1.mockLeads,
        getBooking: getByIdResolver(mocks_1.mockBookings),
        getCompany: getByIdResolver(mocks_1.mockCompanies),
        getLead: getByIdResolver(mocks_1.mockLeads),
        getLocation: getByIdResolver(mocks_1.mockLocations)
    },
    Mutation: {
        createBooking: (root, args, context) => {
            if (!args.booking) {
                throw new Error(`You need the booking input`);
            }
            const newBooking = Object.assign({ id: `book${mocks_1.mockBookings.length + 1}` }, args.booking);
            if (!lodash_1.find(mocks_1.mockCompanies, { id: newBooking.Company })) {
                throw new Error(`Company does not exists`);
            }
            if (!lodash_1.find(mocks_1.mockLocations, { id: newBooking.Location })) {
                throw new Error(`Location does not exists`);
            }
            mocks_1.mockBookings.push(newBooking);
            return newBooking;
        },
        createCompany: (root, args, context) => {
            if (!args.company) {
                throw new Error(`You need the company input`);
            }
            const newCompany = Object.assign({ id: `book${mocks_1.mockCompanies.length + 1}` }, args.company);
            mocks_1.mockCompanies.push(newCompany);
            return newCompany;
        }
    }
};
const schema = graphql_tools_1.mergeSchemas({
    schemas: [
        bookingSchema,
        typeDefs
    ],
    resolvers
});
const server = new apollo_server_1.ApolloServer({ schema });
server.listen()
    .then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
})
    .catch((e) => console.log(e));
//# sourceMappingURL=server.js.map