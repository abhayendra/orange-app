import { gql } from "@apollo/client";

export const listRepositories = gql`
  query {
    listRepositories {
      name
      owner
      size
    }
  }
`;

export const repoDetail = gql`
  query RepoDetails($name: String!) {
    repoDetails(name: $name) {
      name
      numberOfFiles
      owner
      size
      isPrivate
      activeWebhooks { 
        id
        name
        type
        active
      }
    }
  }
`;

export const fileContent = gql`
  query RepoDetails($name: String!) {
    repoDetails(name: $name) {
      name
      numberOfFiles
      owner
      size
      isPrivate
      activeWebhooks { 
        id
        name
        type
        active
      }
    }
  }
`;