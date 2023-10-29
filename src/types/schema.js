export const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  #USER AND AUTH TYPES
  type User {
    fullname: String!
    email: String!
    password: String!
  }

  type AuthDetails {
    token: String
    user: User
  }
  #END USER AND AUTH TYPES

  #CONTENT DATA TYPES

  """
  The Image type represent images uploaded to Korria CMS image server.
  All images will be supplied via a source link. Downloads are currently not supported.
  """
  type Image {
    id: String!
    title: String!
    src: String!
    alt: String!
    project: Project!
    order: String
    copyright: String
    tags: [String!]
    uploadedby: User!
    uploadedon: String!
  }

  input 

  """
  The Text type represents Textual content.
  Text should be plain text, as support for different types of text is minimal.
  Please avoid injecting raw HTML into text!
  """
  type Text {
    id: String!
    title: String!
    payload: String!
    project: Project!
    order: String
    tags: [String!]
    createdby: User!
    createdon: String!
  }
  #END CONTENT DATA TYPES

  #ORDER TYPE

  """
  Orders are an organisatin mechanism of Korria.
  They allow a client to group content under a single title.
  Clients can retrieve content filtered by orders
  """
  type Order {
    id: String!
    title: String!
    createdby: User!
    createdon: String!
    tags: [String!]
  }
  #END ORDER TYPE

  #PARCEL TYPE
  type Parcel {
    id: String!
    title: String!
    project: Project!
    tags: [String!]
    images: [Image!]
    texts: [Text!]
    order: [Order!]
    createdby: User!
    createdon: String!

  }
  #END PARCEL TYPE

  #PROJECT TYPES

  """
  Projects are at the root of content management in Korria.
  They are the primary containers of content. YOu need to define a project before making content.
  """
  type Project {
    id: String!
    title: String!
    parcels: [Parcel!]
    orders: [Order!]
    images: [Image!]
    texts: [Text!]
    createdby: User!
    createdon: String!
    tags: [String!]
  }
  #END PROJECT TYPES

  #QUERY TYPES
  type Query {
    books: [Book]
    users: [User]
  }

  type Query {
    clientByEmail(email: String!): User
  }
  #END QUERYTYPES
  
  #MUTATION TYPES
  type Mutation {
    signup(fullname: String!, email: String!, password: String!): User
    login(email: String!, password: String!): AuthDetails
  }
  #END MUTATION TYPES
`;