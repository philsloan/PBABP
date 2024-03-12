import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
  query users($username: String) {
    users(username: $username) {
    _id
    email
    username
    projects {
      _id
      projectAuthor
      projectText
      projectTitle
      paypal_link
      createdAt
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
  query projects {
    projects {
    _id
    projectAuthor
    projectText
    projectTitle
    paypal_link
    createdAt
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
    projectAuthor
    projectText
    projectTitle
    paypal_link
    createdAt
    comments {
      _id
      commentAuthor
      commentText
      createdAt
    }
  }
}
`;
