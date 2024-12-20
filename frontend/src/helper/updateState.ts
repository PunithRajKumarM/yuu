import { TState } from "../types/types";

// update state
export const updateState = (value: string, setState: TState) => {
  setState((pre) => ({
    ...pre,
    value: value,
  }));
};
