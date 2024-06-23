'use client';

import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

interface SidebarProviderProps {
  children: ReactNode;
}

interface SidebarContextProps {
  isMinimized: boolean;
  toggle: () => void;
}

const defaultSidebarContext = {
  isMinimized: false,
  toggle: () => {},
};

const SidebarContext = createContext<SidebarContextProps>(
  defaultSidebarContext
);

export const useSidebarContext = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error(
      'useSidebarContext must be used within the SidebarProvider component'
    );
  }
  return context;
};

interface SidebarProviderProps {
  children: ReactNode;
}

export const SidebarProvider: React.FC<SidebarProviderProps> = ({
  children,
}) => {
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <SidebarContext.Provider
      value={{
        isMinimized,
        toggle: () => setIsMinimized((prev: boolean) => !prev),
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
