import {
  Box,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerBody,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useSidebarDrawer } from '../../hooks/sidebarDrawer';

import { SidebarNav } from './SidebarNav';

export function Sidebar() {
  const { isOpen, onClose } = useSidebarDrawer();

  const isDrawerSIdebar = useBreakpointValue({
    base: true,
    lg: false,
  });

  if (!isDrawerSIdebar) {
    return (
      <Box as="aside" w="64" mr="8">
        <SidebarNav />
      </Box>
    );
  }

  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent bg="gray.800" p="4">
          <DrawerCloseButton mt="6" />

          <DrawerHeader>Navegação</DrawerHeader>

          <DrawerBody>
            <SidebarNav />
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
}
