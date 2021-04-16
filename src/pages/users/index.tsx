import {
  Box,
  Flex,
  Text,
  Heading,
  Button,
  Table,
  Thead,
  Th,
  Tbody,
  Tr,
  Td,
  Icon,
  Checkbox,
  useBreakpointValue,
} from '@chakra-ui/react';
import { RiAddLine, RiPencilLine } from 'react-icons/ri';

import { Header } from '../../components/Header';
import { Pagination } from '../../components/Pagination';
import { Sidebar } from '../../components/Sidebar';

export default function UserList() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários
            </Heading>

            <Button
              as="a"
              size="sm"
              fontSize="sm"
              colorScheme="pink"
              leftIcon={<Icon as={RiAddLine} fontSize="20" />}
            >
              Criar novo
            </Button>
          </Flex>

          <Table colorScheme="whiteAlpha">
            <Thead>
              <Tr>
                <Th px={['4', '4', '6']} color="gray.300" width="8">
                  <Checkbox colorScheme="pink" />
                </Th>

                <Th>Usuário</Th>

                {isWideVersion && <Th>Data de cadastro</Th>}

                <Th w="1"></Th>
              </Tr>
            </Thead>

            <Tbody>
              {new Array(4).fill(null).map(() => (
                <Tr>
                  <Td px={['4', '4', '6']}>
                    <Checkbox colorScheme="pink" />
                  </Td>

                  <Td>
                    <Box>
                      <Text fontWeight="bold">José Gabriel</Text>

                      <Text fontSize="sm" color="gray.300">
                        josegabriel@det.ufc.br
                      </Text>
                    </Box>
                  </Td>

                  {isWideVersion && <Td>04 de Abril, 2021</Td>}

                  <Td w="1">
                    {isWideVersion ? (
                      <Button
                        as="a"
                        size="sm"
                        fontSize="sm"
                        colorScheme="purple"
                        leftIcon={<Icon as={RiPencilLine} fontSize="18" />}
                      >
                        Editar
                      </Button>
                    ) : (
                      <Button as="a" size="sm" colorScheme="purple" px="2">
                        <Icon as={RiPencilLine} fontSize="18" />
                      </Button>
                    )}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>

          <Pagination />
        </Box>
      </Flex>
    </Box>
  );
}
