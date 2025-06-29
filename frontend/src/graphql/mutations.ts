import { gql } from '@apollo/client'

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        email
        name
        role
      }
    }
  }
`

export const REGISTER = gql`
  mutation Register($input: CreateUserInput!) {
    register(input: $input) {
      token
      user {
        id
        email
        name
        role
      }
    }
  }
`

export const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      email
      name
      role
      createdAt
      updatedAt
    }
  }
`

export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      email
      name
      role
      createdAt
      updatedAt
    }
  }
`

export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`

export const CREATE_POST = gql`
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      id
      title
      content
      published
      createdAt
      updatedAt
      author {
        id
        name
        email
      }
    }
  }
`

export const UPDATE_POST = gql`
  mutation UpdatePost($id: ID!, $input: UpdatePostInput!) {
    updatePost(id: $id, input: $input) {
      id
      title
      content
      published
      createdAt
      updatedAt
      author {
        id
        name
        email
      }
    }
  }
`

export const DELETE_POST = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id)
  }
`

export const TOGGLE_STAR_CHARACTER = gql`
  mutation ToggleStarCharacter($id: ID!) {
    toggleStarCharacter(id: $id) {
      id
      isStarred
    }
  }
`

export const ADD_COMMENT = gql`
  mutation AddComment($characterId: ID!, $text: String!) {
    addComment(characterId: $characterId, text: $text) {
      id
      text
      createdAt
    }
  }
`

export const DELETE_COMMENT = gql`
  mutation DeleteComment($id: ID!) {
    deleteComment(id: $id) {
      id
    }
  }
` 