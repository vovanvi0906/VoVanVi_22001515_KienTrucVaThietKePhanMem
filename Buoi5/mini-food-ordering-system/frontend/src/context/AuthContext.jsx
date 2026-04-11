import { createContext, useContext, useState } from "react";
import { clearStoredUser, getStoredUser, saveStoredUser } from "../utils/authStorage";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(getStoredUser);

  const login = (user) => {
    setCurrentUser(user);
    saveStoredUser(user);
  };

  const logout = () => {
    setCurrentUser(null);
    clearStoredUser();
  };

  const value = {
    currentUser,
    isAuthenticated: Boolean(currentUser),
    isAdmin: currentUser?.role === "ADMIN",
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
