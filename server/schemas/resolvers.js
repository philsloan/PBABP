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
        projects: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Project.find(params).sort({ createdAt: -1 });
        },
        project: async (parent, { projectId }) => {
            return Project.findOne({ _id: projectId });
        },
    },
}