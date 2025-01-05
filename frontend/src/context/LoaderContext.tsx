import { createContext, ReactNode, useMemo, useState } from 'react';
import { IPostContext } from '../interfaces/interfaces';

export const LoaderContext = createContext<IPostContext>({
  open: false,
  setOpen: () => {},
});

export default function LoaderContextProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const value = useMemo(
    () => ({
      open,
      setOpen,
    }),
    [open]
  );
  return <LoaderContext.Provider value={value}>{children}</LoaderContext.Provider>;
}
