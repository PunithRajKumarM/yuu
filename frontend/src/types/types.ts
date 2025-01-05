import { ApolloQueryResult, OperationVariables } from '@apollo/client';
import { IExistingEmail } from '../interfaces/interfaces';

// types
export type TExistingEmailData = IExistingEmail | undefined;

export type TState = React.Dispatch<
  React.SetStateAction<{
    value: string;
    error: boolean;
    helperText: string;
  }>
>;

export type TError = React.Dispatch<
  React.SetStateAction<{
    status: boolean;
    message: string;
  }>
>;

export type TToastType = 'success' | 'error';

export type TLoggedUserDataState = {
  email: string;
  fullName: string;
  userName: string;
  profilePicture: string | null;
};

export type TGetUser = {
  get_user: {
    message: string;
    user: TLoggedUserDataState;
  };
};

export type TUsersPosts = {
  id: string;
  fullName: string;
  userName: string;
  profilePicture: string;
  posts: {
    id: string;
    link: string;
    text: string;
    createdAt: string;
    likes: {
      id: string;
      user: {
        id: string;
      };
    }[];
    comments: {
      id: string;
      comment: string;
      user: {
        id: string;
      };
    }[];
  }[];
};

export type TGetUsersPosts = {
  get_users_posts: TUsersPosts[];
};

export type TIDArray = string[];

export type TRefetch = (
  variables?: Partial<OperationVariables> | undefined
) => Promise<ApolloQueryResult<any>>;

export type TSelectImage = React.Dispatch<React.SetStateAction<string | ArrayBuffer | null>>;
