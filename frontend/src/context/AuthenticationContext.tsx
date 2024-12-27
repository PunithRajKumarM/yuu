import { createContext, ReactNode, useMemo, useState } from 'react';
import { IAuthenticationContext } from '../interfaces/interfaces';

// authentication context
export const AuthenticationContext = createContext<IAuthenticationContext>({
  isLoggedIn: false,
  authType: 'login',
  setAuthState: () => {},
});

export default function AuthenticationContextProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<Omit<IAuthenticationContext, 'setAuthState'>>({
    isLoggedIn: false,
    authType: 'login',
  });

  function updateAuthDetails(state: Partial<IAuthenticationContext>) {
    setAuth((pre) => ({
      ...pre,
      ...state,
    }));
  }

  const value = useMemo(
    () => ({
      isLoggedIn: auth.isLoggedIn,
      authType: auth.authType,
      setAuthState: updateAuthDetails,
    }),
    [auth.isLoggedIn, auth.authType]
  );

  return <AuthenticationContext.Provider value={value}>{children}</AuthenticationContext.Provider>;
}
