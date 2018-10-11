import { IResolvers, ApolloServer, gql } from 'apollo-server'
import { makeExecutableSchema, mergeSchemas } from 'graphql-tools'
import { mockBookings, mockCompanies, mockLeads, mockLocations } from './mocks'
import { Lead, Location, Company, Booking } from './types'
import { find } from 'lodash'

const bookingSchema = makeExecutableSchema({
  typeDefs: gql`
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
`})

const companySchema = makeExecutableSchema({
  typeDefs: gql`
  type Company {
    id: String!
    name: String!
  }

  type Query {
    getCompany(id: String): Company
    getCompanies: [Company]
  }

  input ICompany {
    name: String!
    Company: String!
  }

  type Mutation {
    createCompany(company: ICompany): Company
  }
`})

const typeDefs = makeExecutableSchema({
  typeDefs: gql`
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

  type Query {
    getLocation(id: String): Location
    getLocations: [Location]
    getLead(id: String): Lead
    getLeads: [Lead]
  }
`})

type Resolver = (root?: any, args?: any, context?: any) => any

interface Resolvers extends IResolvers {
  Query: {
    [key: string]: Resolver
  },
  Mutation: {
    [key: string]: Resolver
  }
}

function getById (collection: any[], id: string) {
  return find(collection, { id } as any)
}

type IdResolverGetter = (collection: any[]) => Resolver
const getByIdResolver: IdResolverGetter = (collection) => (root, { id }, context) => getById(collection, id)

// Provide resolver functions for your schema fields
const resolvers: Resolvers = {
  Query: {
    getBookings: (root, args, context) => mockBookings,
    getCompanies: (root, args, context) => mockCompanies,
    getLocations: (root, args, context) => mockLocations,
    getLeads: (root, args, context) => mockLeads,
    getBooking: getByIdResolver(mockBookings),
    getCompany: getByIdResolver(mockCompanies),
    getLead: getByIdResolver(mockLeads),
    getLocation: getByIdResolver(mockLocations)
  },
  Mutation: {
    createBooking: (root, args, context) => {
      if (!args.booking) {
        throw new Error(`You need the booking input`)
      }
      const newBooking = {
        id: `book${mockBookings.length + 1}`,
        ...args.booking
      }
      if (!find(mockCompanies, { id: newBooking.Company })) {
        throw new Error(`Company does not exists`)
      }
      if (!find(mockLocations, { id: newBooking.Location })) {
        throw new Error(`Location does not exists`)
      }
      mockBookings.push(newBooking)
      return newBooking
    },
    createCompany: (root, args, context) => {
      if (!args.company) {
        throw new Error(`You need the company input`)
      }
      const newCompany = {
        id: `c{mockCompanies.length + 1}`,
        ...args.company
      }
      mockCompanies.push(newCompany)
      return newCompany
    }
  }
}
const schema = mergeSchemas({
  schemas: [
    bookingSchema,
    typeDefs,
    companySchema
  ],
  resolvers
})
const server = new ApolloServer({ schema })

server.listen()
  .then(({ url }: { url: any }) => {
    console.log(`🚀 Server ready at ${url}`)
  })
  .catch((e: Error) => console.log(e))
