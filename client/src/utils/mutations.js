import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    token
  }
}
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
  addUser(username: $username, email: $email, password: $password) {
    token
  }
}
`;

export const ADD_PROJECT = gql`
  mutation addProject($projectTitle: String!, $projectText: String!) {
  addProject(projectTitle: $projectTitle, projectText: $projectText) {
    _id
    createdAt
    projectAuthor
    projectText
    projectTitle
  }
}
`;

export const ADD_COMMENT = gql`
  mutation addComment($projectId: ID!, $commentText: String!) {
  addComment(projectId: $projectId, commentText: $commentText) {
    _id
    createdAt
    projectAuthor
    projectText
    projectTitle
    comments {
      _id
      commentAuthor
      commentText
      createdAt
    }
  }
}
`;
