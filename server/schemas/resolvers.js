const { User, Project } = require('../models');
const { AuthenticationError, signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.find().populate('projects');
        },
        user: async (parent, { username }) => {
            return User.findOne({ username }).populate('projects');
        },
        projects: async (parent, { projectAuthor }) => {
            const params = projectAuthor ? { projectAuthor } : {};
            return Project.find(params).sort({ createdAt: -1 });
        },
        project: async (parent, { projectId }) => {
            return Project.findOne({ _id: projectId });
        },
    },
    Mutation: {
        addUser: async (parent, { username, email, password }) => {
          const user = await User.create({ username, email, password });
          const token = signToken(user);
          return { token, user };
        },
        login: async (parent, { username, password }) => {
          const user = await User.findOne({ username });
    
          if (!user) {
            throw AuthenticationError;
          }
    
          const correctPw = await user.isCorrectPassword(password);
    
          if (!correctPw) {
            throw AuthenticationError;
          }
    
          const token = signToken(user);
    
          return { token, user };
        },
        addProject: async (parent, args, context) => {
          if (context.user) {
            const project = await Project.create({
              ...args,
              projectAuthor: context.user.username,
            });
    
            await User.findOneAndUpdate(
              { _id: context.user._id },
              { $addToSet: { projects: project._id } }
            );
    
            return project;
          }
          throw AuthenticationError;
        },
        addComment: async (parent, { projectId, commentText }, context) => {
          if (context.user) {
            return Project.findOneAndUpdate(
              { _id: projectId },
              {
                $addToSet: {
                  comments: { commentText, commentAuthor: context.user.username },
                },
              },
              {
                new: true,
                runValidators: true,
              }
            );
          }
          throw AuthenticationError;
        },
        removeProject: async (parent, { projectId }, context) => {
          if (context.user) {
            const project = await Project.findOneAndDelete({
              _id: projectId,
              projectAuthor: context.user.username,
            });
    
            await User.findOneAndUpdate(
              { _id: context.user._id },
              { $pull: { projects: project._id } }
            );
    
            return project;
          }
          throw AuthenticationError;
        },
        removeComment: async (parent, { projectId, commentId }, context) => {
          if (context.user) {
            return Project.findOneAndUpdate(
              { _id: projectId },
              {
                $pull: {
                  comments: {
                    _id: commentId,
                    commentAuthor: context.user.username,
                  },
                },
              },
              { new: true }
            );
          }
          throw AuthenticationError;
        },
      },
}

module.exports = resolvers;