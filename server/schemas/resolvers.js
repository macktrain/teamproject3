const { AuthenticationError } = require('apollo-server-express');
const { Profile, Requests } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    reqs: async () => {
      return Requests.find();
    },
    profiles: async () => {
      return Profile.find();
    },

    requestProfiles: async (parent, args) => {
      return Profile.findById(profile => profile._id === args.profileId);
    },

    profile: async (parent, { profileId }) => {
      const profile = await  Profile.findOne({ _id: profileId });
      return profile;
    },
    // By adding context to our query, we can retrieve the logged in user without specifically searching for them
    me: async (parent, args, context) => {
      if (context.user) {
        return Profile.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    retrieveFriendRequests: async (parent, { receiver, response }) => {
      return Requests.find({ receiver: receiver, response: response });
    }
  },

  Mutation: {
    sendFriendRequest: async (parent, { sender, sender_fName, sender_lName, receiver, response }) => {
      try {
        const friendrequest = await Requests.create({ sender, sender_fName, sender_lName, receiver, response });
        console.log(friendrequest)
        return { friendrequest };
      } catch (e) {
        console.log(e);
      }

    },
    addProfile: async (parent, { fName, lName, age, email, password, locCity, locState}) => {
      console.log(fName, lName, age, email, password, locCity, locState)
      const profile = await Profile.create({ fName, lName, age, email, password, locCity, locState });
      const token = signToken(profile);
      console.log(profile)
      return { token, profile };

    },
    login: async (parent, { email, password }) => {
      const profile = await Profile.findOne({ email });

      if (!profile) {
        throw new AuthenticationError('No profile with this email found!');
      }

      const correctPw = await profile.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }

      const token = signToken(profile);
      return { token, profile };
    },

    // Add a third argument to the resolver to access data in our `context`
    addHobby: async (parent, { profileId, hobby }, context) => {
      // If context has a `user` property, that means the user executing this mutation has a valid JWT and is logged in
      if (context.user) {
        return Profile.findOneAndUpdate(
          { _id: profileId },
          {
            $addToSet: { hobbies: hobby },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      // If user attempts to execute this mutation and isn't logged in, throw an error
      throw new AuthenticationError('You need to be logged in!');
    },
    // Set up mutation so a logged in user can only remove their profile and no one else's
    removeProfile: async (parent, args, context) => {
      if (context.user) {
        return Profile.findOneAndDelete({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    // Make it so a logged in user can only remove a hobby from their own profile
    removeHobby:  async (parent, { hobby }, context) => {
      if (context.user) {
        return Profile.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { hobbies: hobby } },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
