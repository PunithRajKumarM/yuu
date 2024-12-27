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
};

export type TGetUser = {
  get_user: {
    message: string;
    user: TLoggedUserDataState;
  };
};
