import { createContext, ReactNode, useMemo, useState } from 'react';
import { IPostContext } from '../interfaces/interfaces';

export const PostContext = createContext<IPostContext>({
  open: false,
  setOpen: () => {},
});

export default function PostContextProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const value = useMemo(
    () => ({
      open,
      setOpen,
    }),
    [open]
  );
  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
}
