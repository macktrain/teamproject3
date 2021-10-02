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
