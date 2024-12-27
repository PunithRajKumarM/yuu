import { TLoggedUserDataState, TToastType } from '../types/types';

// interfaces
export interface IExistingEmail {
  email: string;
  password: string;
  fullName: string;
  userName: string;
}

export interface LoginSignupStateProps {
  value: string;
  error: boolean;
  helperText: string;
}

export interface EmailProps {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<LoginSignupStateProps>>;
  inputRef: React.MutableRefObject<HTMLInputElement | null>;
  error: boolean;
  emailOnBlurHandler: () => void;
  helperText: string;
}

export interface PasswordProps {
  value: string;
  passwordHandler: (e: string) => void;
  showPassword: boolean;
  setShowPassword: (state: boolean) => void;
  label: string;
  inputRef: React.MutableRefObject<HTMLInputElement | null>;
  error: boolean;
  passwordOnBlurHandler: () => void;
  helperText: string;
}

export interface IAuthenticationContext {
  isLoggedIn: boolean;
  authType: 'login' | 'signup';
  setAuthState: (state: Partial<IAuthenticationContext>) => void;
}

export interface IToastContext {
  toast: string;
  toastType: TToastType;
  updateToast: (message: string, type?: TToastType) => void;
}

export interface IJWTDecodedToken {
  id: string;
  uat: string;
  exp: string;
}

export interface ILoggedUserData {
  value: null | TLoggedUserDataState;
}
