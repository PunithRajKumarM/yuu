import { gql } from '@apollo/client';

// queries
export const SAVE_USER = gql`
  mutation saveUser($email: String!, $password: String!, $userName: String!, $fullName: String!) {
    save_user(
      user: { email: $email, password: $password, userName: $userName, fullName: $fullName }
    ) {
      message
      accessToken
      refreshToken
    }
  }
`;

export const LOGIN = gql`
  query login($email: String!, $password: String!) {
    login(login: { email: $email, password: $password }) {
      message
      accessToken
      refreshToken
      data
    }
  }
`;

export const RESET_PASSWORD = gql`
  mutation resetPassword($email: String!, $password: String!) {
    reset_password(data: { email: $email, password: $password }) {
      message
    }
  }
`;
export const GET_USER = gql`
  query getUser($id: String!) {
    get_user(id: $id) {
      message
      user {
        email
        userName
        fullName
      }
    }
  }
`;
