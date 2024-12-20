import { IExistingEmail } from "../interfaces/interfaces";

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
