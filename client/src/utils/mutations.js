import { gql } from '@apollo/client';

export const ADD_PROFILE = gql`
  mutation addProfile($fName: String, $lName: String, $age: String, $email: String, $password: String, $locCity: String, $locState: String) {
    addProfile(fName: $fName, lName: $lName, age: $age, email: $email, password: $password, locCity: $locCity, locState: $locState) {
      token
      profile {
        _id
        fName
        lName
        email
        password
        locCity
        locState
        age
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
        fName
        lName
        email
        password
        locCity
        locState
        age
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

export const SEND_FRIEND_REQUEST = gql`
  mutation sendFriendRequest($sender: String, $receiver: String, $response: String) {
    sendFriendRequest(sender: $sender, receiver: $receiver, response: $response) {
      _id 
      sender
      receiver
      response
    }
  }
`;
