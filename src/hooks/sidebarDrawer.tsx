import { createContext, ReactNode, useContext } from 'react';
import { useDisclosure, UseDisclosureReturn } from '@chakra-ui/react';

interface SidebarDrawerProviderProps {
  children: ReactNode;
}

type SidebarDrawerContextData = UseDisclosureReturn;

const SidebarDrawerContext = createContext<SidebarDrawerContextData>(
  {} as SidebarDrawerContextData
);

export function SidebarDrawerProvider({
  children,
}: SidebarDrawerProviderProps) {
  const disclosure = useDisclosure();

  return (
    <SidebarDrawerContext.Provider value={disclosure}>
      {children}
    </SidebarDrawerContext.Provider>
  );
}

export function useSidebarDrawer() {
  return useContext(SidebarDrawerContext);
}
