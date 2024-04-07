'use client';

import React, {
  useContext,
  useMemo,
  useState,
  createContext,
  ReactNode,
} from 'react';
import useGetCurrentUser from '../hooks/user/use-get-current-user';
import { User } from '../interfaces/user';

interface UserProviderProps {
  children: ReactNode; // More generic type to allow any valid React child/children
}

export interface UserContextState {
  currentUser?: null | User; // Explicitly allow for user to be undefined or null
  getCurrentUser?: () => void;
  setCurrentUser?: any | null; // Allow null here
  logout?: () => void;
  isAuthenticating?: boolean;
}

// Define a default context value that matches the shape of UserContextState
const defaultContextValue: UserContextState = {
  currentUser: null, // Default to null, but now it's explicitly part of the context type
  setCurrentUser: null,
  logout: () => {},
  isAuthenticating: true,
};

// Context creation with a default value that matches the expected shape
export const UserContext = createContext<UserContextState>(defaultContextValue);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error(
      'useUserContext must be used within the UserProvider component'
    );
  }
  return context;
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [isAuthenticating, setIsAuthenticating] = useState(true); // Initially true, assuming authentication check is in progress

  const {
    getCurrentUser,
    currentUser,
    isLoading: isFetching,
  } = useGetCurrentUser();

  return (
    <UserContext.Provider
      value={{
        currentUser,
        isAuthenticating,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
