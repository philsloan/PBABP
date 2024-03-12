const typeDefs = `
    type Auth {
        token: ID!
        user: User
    }

    type User {
        _id: ID
        username: String
        email: String
        password: String
        projects: [Project]

    }

    type Project {
        _id: ID
        projectTitle: String
        projectText: String
        projectAuthor: String
        paypal_link: String
        comments: [Comment]
        createdAt: String

    }

    type Comment {
        _id: ID
        commentText: String
        commentAuthor: String
        createdAt: String

    }

    type Query {
        users(username: String): [User]
        
        projects: [Project]
        project(projectId: String!): Project
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(username: String!, password: String!): Auth
        addProject(projectTitle: String!, projectText: String!, paypal_link: String): Project
        addComment(projectId: ID!, commentText: String!): Project
        removeProject(projectId: ID!): Project
        removeComment(projectId: ID!, commentId: ID!): Project
    }
`;
// user(username: String!): User

module.exports = typeDefs;