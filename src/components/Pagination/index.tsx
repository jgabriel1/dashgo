import { Stack, Box, Text } from '@chakra-ui/react';

import { generateNumberRange } from '../../util/generateNumberRange';

import { PaginationItem } from './PaginationItem';

interface PaginationProps {
  totalCountOfRegisters: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  registersPerPage?: number;
  siblingsCount?: number;
}

export function Pagination({
  onPageChange,
  totalCountOfRegisters,
  currentPage = 1,
  registersPerPage = 10,
  siblingsCount = 1,
}: PaginationProps) {
  const lastPage = Math.ceil(totalCountOfRegisters / registersPerPage);

  const previousPages =
    currentPage > 1
      ? generateNumberRange(currentPage - 1 - siblingsCount, currentPage - 1)
      : [];

  const nextPages =
    currentPage < lastPage
      ? generateNumberRange(
          currentPage,
          Math.min(currentPage + siblingsCount, lastPage)
        )
      : [];

  const firstRegister = (currentPage - 1) * registersPerPage + 1;
  const lastRegister = firstRegister + registersPerPage - 1;

  return (
    <Stack
      direction={['column', 'row']}
      mt="8"
      justify="space-between"
      align="center"
      spacing="6"
    >
      <Box>
        <strong>{firstRegister}</strong> - <strong>{lastRegister}</strong> de{' '}
        <strong>{totalCountOfRegisters}</strong>
      </Box>

      <Stack direction="row" spacing="2">
        {currentPage > 1 + siblingsCount && (
          <>
            <PaginationItem onClick={onPageChange} pageNumber={1} />
            {currentPage > 2 + siblingsCount && (
              <Text color="gray.300" w="8" textAlign="center" userSelect="none">
                ...
              </Text>
            )}
          </>
        )}

        {previousPages.length > 0 &&
          previousPages.map(page => (
            <PaginationItem
              onClick={onPageChange}
              key={page}
              pageNumber={page}
            />
          ))}

        <PaginationItem
          onClick={onPageChange}
          pageNumber={currentPage}
          isCurrent
        />

        {nextPages.length > 0 &&
          nextPages.map(page => (
            <PaginationItem
              onClick={onPageChange}
              key={page}
              pageNumber={page}
            />
          ))}

        {currentPage + siblingsCount < lastPage && (
          <>
            {currentPage + 1 + siblingsCount < lastPage && (
              <Text color="gray.300" w="8" textAlign="center" userSelect="none">
                ...
              </Text>
            )}
            <PaginationItem onClick={onPageChange} pageNumber={lastPage} />
          </>
        )}
      </Stack>
    </Stack>
  );
}
