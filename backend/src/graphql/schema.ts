import { gql } from 'graphql-tag'

export const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    name: String
    role: Role!
    createdAt: String!
    updatedAt: String!
    posts: [Post!]!
  }

  type Post {
    id: ID!
    title: String!
    content: String
    published: Boolean!
    authorId: String!
    author: User!
    createdAt: String!
    updatedAt: String!
  }

  enum Role {
    USER
    ADMIN
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
    posts: [Post!]!
    post(id: ID!): Post
    me: User
    characters(
      name: String
      species: String
      status: String
      gender: String
      origin: String
      orderBy: String
      order: String
    ): [Character!]!
    character(id: ID!): Character
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
    updateUser(id: ID!, input: UpdateUserInput!): User!
    deleteUser(id: ID!): Boolean!
    
    createPost(input: CreatePostInput!): Post!
    updatePost(id: ID!, input: UpdatePostInput!): Post!
    deletePost(id: ID!): Boolean!
    
    login(email: String!, password: String!): AuthPayload!
    register(input: CreateUserInput!): AuthPayload!
    toggleStarCharacter(id: ID!): Character!
    addComment(characterId: ID!, text: String!): Comment!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  input CreateUserInput {
    email: String!
    name: String
    password: String!
  }

  input UpdateUserInput {
    email: String
    name: String
    password: String
  }

  input CreatePostInput {
    title: String!
    content: String
    published: Boolean
  }

  input UpdatePostInput {
    title: String
    content: String
    published: Boolean
  }

  type Character {
    id: ID!
    name: String!
    image: String!
    species: String!
    status: String!
    gender: String!
    origin: String!
    occupation: String
    isStarred: Boolean!
    isDeleted: Boolean!
    comments: [Comment!]!
    createdAt: String!
    updatedAt: String!
  }

  type Comment {
    id: ID!
    characterId: ID!
    text: String!
    createdAt: String!
  }
` 