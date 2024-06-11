import { create } from 'zustand';
import { useState } from 'react';

interface SidebarStore {
  isMinimized: boolean;
  toggle: () => void;
}

export const useSidebar = (): SidebarStore => {
  const [isMinimized, setIsMinimized] = useState<boolean>(false);

  const toggle = () => setIsMinimized((prev: boolean) => !prev);

  return { isMinimized, toggle };
};
