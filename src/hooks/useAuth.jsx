import React, {
  useContext,
  createContext,
  useCallback,
  useMemo,
  useState,
  useEffect,
} from "react";
import { useQueryClient } from "react-query";

import {
  getUser,
  removeUser,
  setUser as updateUser,
  setToken as setTokenStorage,
  removeToken,
  getToken,
} from "@/utils/account";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

const updateTokenStorage = async (newToken) => {
  if (!newToken) {
    await removeToken();
  } else {
    await setTokenStorage(newToken);
  }
};

const updateUserStorage = async (user) => {
  if (!user) {
    await removeUser();
  } else {
    await updateUser(user);
  }
};

export const AuthProvider = ({ children }) => {
  const queryCache = useQueryClient();
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const handleUpdateToken = useCallback(async (newToken) => {
    setToken(newToken);
    await updateTokenStorage(newToken);
  }, []);

  const handleUpdateUser = useCallback(async (user) => {
    setUser(user);
    await updateUserStorage(user);
  }, []);

  const handleLogout = useCallback(async () => {
    queryCache.cancelQueries();
    queryCache.clear();
    setToken(null);
    await updateTokenStorage(null);
  }, [queryCache]);

  const handleRole = useCallback(
    (r) => {
      if (!r) return false;
      const givenRoles = Array.isArray(r) ? r : [r];
      const roles = user?.role || [];
      return givenRoles.some((r) => roles?.includes(r));
    },
    [user]
  );

  useEffect(() => {
    (async () => {
      try {
        const new_token = await getToken();
        const user = await getUser();
        setUser(user);
        setToken(new_token);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const contextValue = useMemo(
    () => ({
      isAuthenticated: !!token,
      profile: JSON.parse(user),
      logout: handleLogout,
      updateToken: handleUpdateToken,
      updateUser: handleUpdateUser,
      hasRole: handleRole,
    }),
    [token, user, handleLogout, handleUpdateToken, handleUpdateUser, handleRole]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
