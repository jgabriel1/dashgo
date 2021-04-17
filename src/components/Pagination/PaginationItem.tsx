import { Button } from '@chakra-ui/react';

interface PaginationItemProps {
  pageNumber: number;
  onClick: (page: number) => void;
  isCurrent?: boolean;
}

export function PaginationItem({
  pageNumber,
  onClick,
  isCurrent = false,
}: PaginationItemProps) {
  if (isCurrent) {
    return (
      <Button
        size="sm"
        fontSize="xs"
        w="4"
        colorScheme="pink"
        disabled
        _disabled={{ bg: 'pink.500', cursor: 'default' }}
      >
        {pageNumber}
      </Button>
    );
  }

  return (
    <Button
      size="sm"
      fontSize="xs"
      w="4"
      bg="gray.700"
      _hover={{ bg: 'gray.500' }}
      onClick={() => onClick(pageNumber)}
    >
      {pageNumber}
    </Button>
  );
}
