import React, { createContext, useContext, useState } from "react";

// Create the Auth Context
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

// Auth Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stores logged-in user info
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  // Mock login function
  const login = (email, password) => {
    setLoading(true);
    setError(null);

    // Simulate API call
    setTimeout(() => {
      if (email === "user@example.com" && password === "password") {
        setUser({ name: "John Doe", email });
        setLoading(false);
      } else {
        setError("Invalid email or password");
        setLoading(false);
      }
    }, 1000);
  };

  // Mock register function
  const register = (name, email, password) => {
    setLoading(true);
    setError(null);

    // Simulate API call
    setTimeout(() => {
      setUser({ name, email });
      setLoading(false);
    }, 1000);
  };

  // Logout function
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
