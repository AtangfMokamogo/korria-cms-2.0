export const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  #INUPT TYPES
  input TagInput {
    tags: [String!]
  }

  input ParcelInput {
    title: String!
    project: String!
    tags: [String!]
    images: [ImageInput!]
    texts: [TextInput!]
    order: [OrderInput!]
  }

  input ImageInput {
    title: String!
    src: String!
    alt: String!
    project: String!
    order: [OrderInput!]
    copyright: String!
    tags: [String!] 
  }

  input TextInput {
    title: String!
    payload: String!
    project: String!
    order: [OrderInput!]
    tags: [String!]
  }

  input OrderInput {
    title: String!
    project: String!
    tags: [String!]
  }
  #END INPUT TYPES

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

  type Image {
    id: String!
    title: String!
    src: String!
    alt: String!
    project: Project!
    order: [Order!]
    copyright: String
    tags: [String!]
    uploadedby: User!
    uploadedon: String!
  } 

  type Text {
    id: String!
    title: String!
    payload: String!
    project: Project!
    order: [Order!]
    tags: [String!]
    createdby: User!
    createdon: String!
  }
  #END CONTENT DATA TYPES

  #ORDER TYPE

  type Order {
    id: String!
    title: String!
    project: Project!
    createdby: User!
    createdon: String!
    tags: [String!]
  }
  #END ORDER TYPE

  #PARCEL TYPE
  type Parcel {
    id: String!
    title: String!
    project: String!
    tags: [String!]
    images: [Image!]
    texts: [Text!]
    order: [Order!]
    createdby: User!
    createdon: String!

  }
  #END PARCEL TYPE

  #PROJECT TYPES

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
    texts: [Text]
    images: [Image]
    parcels: [Parcel]
    projects: [Project]
    orders: [Order]
  }

  type Query {
    clientByEmail(email: String!): User
    ordersByID(orderID: String!): Order
  }
  #END QUERYTYPES
  
  #MUTATION TYPES
  type Mutation {
    signUp(fullname: String!, email: String!, password: String!): User
    logIn(email: String!, password: String!): AuthDetails
    createParcel(input: ParcelInput!): Parcel
  }
  #END MUTATION TYPES
`;