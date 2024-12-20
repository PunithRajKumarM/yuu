import { TError, TState } from "../types/types";

// focus and update
export const focusAndUpdateState = (
  setState: TState,
  error: boolean,
  helperText: string,
  inputRef?: React.MutableRefObject<HTMLInputElement | null>
) => {
  if (inputRef) {
    inputRef.current?.focus();
  }
  setState((pre) => ({
    ...pre,
    error: error,
    helperText: helperText,
  }));
};

export const focusAndUpdateError = (
  setState: TError,
  status: boolean,
  message: string,
  inputRef?: React.MutableRefObject<HTMLInputElement | null>
) => {
  if (inputRef) {
    inputRef.current?.focus();
  }
  setState({
    status,
    message,
  });
};
