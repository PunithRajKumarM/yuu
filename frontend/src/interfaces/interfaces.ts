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

export interface IAuthenticationStatus {
  isLoggedIn: boolean;
  authType: "login" | "signup";
  setAuthState: (state: Partial<IAuthenticationStatus>) => void;
}
