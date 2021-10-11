import { gql } from '@apollo/client';

//This can be used after login to show all friends
export const QUERY_PROFILES = gql`
query allProfiles {
  profiles {
    _id
    fName
    lName
    locCity
    locState
    age
    hobbies
    email
  }
}
`;

export const GET_REQUEST_DETAILS = gql`
  query requestProfiles($profileId: [ID]) {
    requestProfiles(profileId: $profileId) {
      _id
      fName
      lName
      locCity
      locState
      age
      hobbies
      email
    }
  }
`;

//This can be used to find a single friend
export const QUERY_SINGLE_PROFILE = gql`
  query singleProfile($profileId: ID!) {
    profile(profileId: $profileId) {
      _id
      fName
      lName
      locCity
      locState
      age
      hobbies
      email
    }
  }
`;

//This can be used to query just logged in person
export const QUERY_ME = gql`
  query me {
    me {
      _id
      fName
      lName
      locCity
      locState
      age
      hobbies
      email
    }
  }
`;

//This can be used to pull all friend requests made to a logged on user
export const RETRIEVE_FRIEND_REQUESTS = gql`
  query retrieveFriendRequests($receiver: String, $response: String) {
    retrieveFriendRequests(receiver: $receiver, response: $response) {
      _id
      sender
      sender_lName
      sender_fName
      receiver
      response
    }
  }
`;

//This can be used to pull all friend requests made to a logged on user
export const REQS = gql`
  query reqs {
    requests {
      _id
      sender
      receiver
      response
    }
  }
`;
