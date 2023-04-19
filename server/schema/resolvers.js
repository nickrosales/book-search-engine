const { User } = require('../models');
const { AuthenticationError } = require('appo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        user: async (parent, { _id }) => {
            return User.findone({ _id })
        }
    },

    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('No user found with this email');
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }
            const token = signToken(user);
            return { token, user };
        },
        saveBook: async (parent, { savedBooks }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: savedBooks } },
                    { new: true }
                );
                return updatedUser;
            };
            throw new AuthenticationError('not logged in')
        },
        deleteBook: async (parent, {savedBooks}, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: savedBooks } },
                    { new: true }
                );
                return updatedUser;
            };
            throw new AuthenticationError('not logged in')
        }
    },
};

module.exports = resolvers;
