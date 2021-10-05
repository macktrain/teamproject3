const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Profile {
    _id: ID
    fName: String
    lName: String
    locCity: String
    locState: String
    age: String
    email: String
    password: String
    hobbies: [String]
  }

  type Messages {
    _id: ID
    sender: ID
    receiver: ID
    message: String
    msgId: Int  
    #if blank, then this is the original message otherwise, this is a reference back to the original message id
  }

  type Friends {
    _id: ID
    sender: String
    friends: [String]
    #if no Friends record, then no friends.
  }

  type Requests {
    _id: ID
    sender: ID
    receiver: ID
    response: String!
    #The 3 response options are: "blank, accepted or rejected"
  }

  type Auth {
    token: ID!
    profile: Profile
  }

  type Query {
    #profiles will be used for a single person friend search
    profiles: [Profile]!
    profile(profileId: ID!): Profile
    # Because we have the context functionality in place to check a JWT and decode its data, we can use a query that will always find and return the logged in user's data
    me: Profile
    sendFriendRequest: Messages
  }

  type Mutation {
    addProfile(fName: String, lName: String, age: String, email: String, password: String, locCity: String, locState: String): Auth
    login(email: String!, password: String!): Auth
    addHobby(profileId: ID!, hobby: String!): Profile
    removeProfile: Profile
    removeHobby(hobby: String!): Profile
    sendFriendRequest(profileId: ID): Requests
  }
`;

module.exports = typeDefs;
