import { gql } from '@apollo/client'

export const GET_CHARACTERS = gql`
  query GetCharacters($name: String, $species: String) {
    characters(name: $name, species: $species) {
      id
      name
      image
      species
      status
      gender
      origin
      occupation
      isStarred
      comments {
        id
        text
        createdAt
      }
    }
  }
`

export const GET_CHARACTER = gql`
  query GetCharacter($id: ID!) {
    character(id: $id) {
      id
      name
      image
      species
      status
      gender
      origin
      occupation
      isStarred
      comments {
        id
        text
        createdAt
      }
    }
  }
` 