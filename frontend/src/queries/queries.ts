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
  mutation login($email: String!, $password: String!) {
    login(login: { email: $email, password: $password }) {
      message
      accessToken
      refreshToken
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
        profilePicture
      }
    }
  }
`;

export const GET_USERS = gql`
  query getUsers {
    get_users {
      id
      userName
      fullName
      profilePicture
    }
  }
`;

export const GET_NEW_USER_SUBSCRIPTION = gql`
  subscription newUserAdded {
    new_user_added {
      id
      userName
      fullName
      profilePicture
    }
  }
`;

export const SAVE_POST = gql`
  mutation savePost($id: String!, $text: String, $image: String) {
    save_post(post: { id: $id, text: $text, image: $image }) {
      message
    }
  }
`;

export const GET_USERS_POSTS = gql`
  query getUsersPosts {
    get_users_posts {
      users {
        id
        fullName
        userName
        profilePicture
        posts {
          id
          link
          text
          createdAt
          likes {
            id
            user {
              id
              fullName
            }
          }
          comments {
            id
            comment
            user {
              id
            }
            createdAt
          }
        }
      }
    }
  }
`;

export const GET_USER_RELATIONSHIPS = gql`
  query getUserRelationships($id: String!) {
    get_user_relationships(id: $id) {
      followers {
        id
        follower {
          id
        }
      }
      followings {
        id
        following {
          id
        }
      }
    }
  }
`;

export const LOGOUT = gql`
  mutation logout($id: String!) {
    logout(id: $id) {
      message
    }
  }
`;

export const FOLLOW_UNFOLLOW_USER = gql`
  mutation followUnfollowUser($id: String!, $followingId: String!) {
    follow_unfollow_user(id: $id, followingId: $followingId) {
      message
    }
  }
`;

export const ADD_PROFILE_PICTURE = gql`
  mutation addProfilePicture($id: String!, $image: String!) {
    add_profile_picture(id: $id, image: $image) {
      message
    }
  }
`;

export const LIKE_POST = gql`
  mutation likePost($id: String!, $postId: String!) {
    like_post(id: $id, postId: $postId) {
      message
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($postId: String!, $userId: String!, $comment: String!) {
    add_comment(postId: $postId, userId: $userId, comment: $comment) {
      message
    }
  }
`;
