import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
  user(username: $username) {
    _id
    email
    username
    projects {
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
}
`;

export const QUERY_PROJECTS = gql`
  query projects($projectAuthor: String!) {
  projects(projectAuthor: $projectAuthor) {
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

export const QUERY_SINGLE_PROJECT = gql`
  query project($projectId: String!) {
  project(projectId: $projectId) {
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
