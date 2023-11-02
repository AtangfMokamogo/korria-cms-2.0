export const typeDefs = `#graphql

  #INUPT TYPES
  input TagInput {
    tags: [String!]
  }

  input ProjectInput {
    title: String!
    tags: [String!]
  }

  input ParcelInput {
    title: String
    project: ProjectInput!
    tags: [String!]
    images: [ImageInput!]
    texts: [TextInput!]
    order: [String!]
  }

  input ImageInput {
    type: String!
    fields: ImageFields!
  }

  input ImageFields {
    title: String!
    src: String!
    alt: String!
    project: ProjectInput!
    order: [String!]
    copyright: String!
    tags: [String!] 
  }

  input TextInput {
    type: String!
    fields: TextFields!
  }

  input TextFields {
    title: String!
    payload: String!
    project: ProjectInput!
    order: [String!]
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
  type ImageData {
    title: String!
    src: String!
    alt: String!
    project: Project!
    order: [String!]
    copyright: String
    tags: [String!]
  }
  type Image {
    type: String!
    fields: ImageData!
    uploadedby: User!
    uploadedon: String!
  } 

  type TextData {
    title: String!
    payload: String!
    project: Project!
    order: [String!]
    tags: [String!]
  }
  type Text {
    type: String!
    fields: TextData!
    createdby: User!
    createdon: String!
  }

  type ContentTypeDefinationSuccess{
    message: String
    contentID: String
    type: String
    date: String
  }
  #END CONTENT DATA TYPES

  #END ORDER TYPE

  #PARCEL TYPE
  type Parcel {
    title: String!
    project: Project!
    tags: [String!]
    images: [Image!]
    texts: [Text!]
    order: [String!]
    createdby: User!
    createdon: String!

  }
  #END PARCEL TYPE

  #PROJECT TYPES

  type Project {
    title: String!
    createdby: User!
    createdon: String!
    tags: [String!]
  }
  #END PROJECT TYPES

  #QUERY TYPES
  type Query {
    users(id: String!): User
    texts(order: [String!], project: ProjectInput!, tags: TagInput): [Text]
    images(order: [String!], project: ProjectInput!, tags: TagInput): [Image]
    parcels(filterBy: ParcelInput): [Parcel]
    projects(userEmail: String!): [Project]
  }

  type Query {
    clientByEmail(email: String!): User
  }
  #END QUERYTYPES
  
  #MUTATION TYPES
  type Mutation {
    signUp(fullname: String!, email: String!, password: String!): User
    logIn(email: String!, password: String!): AuthDetails
  }

  type Mutation {
    createText(textData: TextInput!): ContentTypeDefinationSuccess
    createProject(projectData: ProjectInput): ContentTypeDefinationSuccess
    createParcel(input: ParcelInput!): ContentTypeDefinationSuccess
  }
  #END MUTATION TYPES
`;
