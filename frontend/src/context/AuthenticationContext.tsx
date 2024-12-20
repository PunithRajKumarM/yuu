import { createContext, ReactNode, useMemo, useState } from "react";
import { IAuthenticationStatus } from "../interfaces/interfaces";

// authentication context
export const AuthenticationContext = createContext<IAuthenticationStatus>({
  isLoggedIn: false,
  authType: "login",
  setAuthState: () => {},
});

function AuthenticationContextProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<Omit<IAuthenticationStatus, "setAuthState">>(
    {
      isLoggedIn: false,
      authType: "login",
    }
  );

  function updateAuthDetails(state: Partial<IAuthenticationStatus>) {
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

  return (
    <AuthenticationContext.Provider value={value}>
      {children}
    </AuthenticationContext.Provider>
  );
}

export default AuthenticationContextProvider;
