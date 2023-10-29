// eslint-disable-next-line import/prefer-default-export
export const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  type User {
    fullname: String!
    email: String!
    password: String!
  }

  type AuthDetails {
    token: String
    user: User
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
    users: [User]
  }

  type Query {
    clientByEmail(email: String!): User
  }

  type Mutation {
    signup(fullname: String!, email: String!, password: String!): User
  }

  type Mutation {
    login(email: String!, password: String!): AuthDetails
  }
  
`;
