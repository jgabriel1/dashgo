import { useState } from 'react';
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
  Spinner,
  Link,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { RiAddLine, RiPencilLine } from 'react-icons/ri';

import { useUsers } from '../../services/hooks/useUsers';

import { Header } from '../../components/Header';
import { Pagination } from '../../components/Pagination';
import { Sidebar } from '../../components/Sidebar';
import { queryClient } from '../../services/queryClient';
import { api } from '../../services/api';

export default function UserList() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, error, isLoading, isFetching } = useUsers({
    page: currentPage,
  });

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  const handlePrefetchUserData = async (userId: string) => {
    await queryClient.prefetchQuery(
      ['user', userId],
      async () => {
        const { data } = await api.get(`users/${userId}`);

        return data;
      },
      {
        staleTime: 1000 * 60 * 10, // 10 minutes
      }
    );
  };

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários
              {!isLoading && isFetching && (
                <Spinner size="sm" color="gray.500" ml="4" />
              )}
            </Heading>

            <NextLink href="/users/create" passHref>
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="pink"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              >
                Criar novo
              </Button>
            </NextLink>
          </Flex>

          {isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify="center">
              <Text>Falha ao obter dados dos usuários</Text>
            </Flex>
          ) : (
            <>
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
                  {data.users.map(user => (
                    <Tr key={user.id}>
                      <Td px={['4', '4', '6']}>
                        <Checkbox colorScheme="pink" />
                      </Td>

                      <Td>
                        <Box>
                          <Link
                            color="purple.400"
                            onMouseEnter={() => handlePrefetchUserData(user.id)}
                          >
                            <Text fontWeight="bold">{user.name}</Text>
                          </Link>

                          <Text fontSize="sm" color="gray.300">
                            {user.email}
                          </Text>
                        </Box>
                      </Td>

                      {isWideVersion && <Td>{user.created_at}</Td>}

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

              <Pagination
                totalCountOfRegisters={data.totalCount}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
