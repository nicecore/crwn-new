import { createContext, useState, useEffect } from "react";
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";

// Actual value you want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

// Provider that allows any components nested in it (child components) to access the values inside of its use state. We're using use state as normal, value and setter for that use state, but we can call this setter from anywhere inside the component tree that is nested inside this provider.

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  // Generate values that will be passed into context provider
  const value = {
    currentUser,
    setCurrentUser,
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if(user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
