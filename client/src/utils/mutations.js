import { gql } from '@apollo/client';

export const ADD_PROFILE = gql`
  mutation addProfile($name: String!, $email: String!, $password: String!) {
    addProfile(name: $name, email: $email, password: $password) {
      token
      profile {
        _id
        name
      }
    }
  }
`;

export const ADD_HOBBY = gql`
  mutation addHobby($profileId: ID!, $hobby: String!) {
    addHobby(profileId: $profileId, hobby: $hobby) {
      _id
      name
      hobbies
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      profile {
        _id
        name
      }
    }
  }
`;

export const REMOVE_HOBBY = gql`
  mutation removeHobby($hobby: String!) {
    removeHobby(hobby: $hobby) {
      _id
      name
      hobbies
    }
  }
`;
