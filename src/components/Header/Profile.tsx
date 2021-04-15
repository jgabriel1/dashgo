import { Flex, Box, Text, Avatar } from '@chakra-ui/react';

export function Profile() {
  return (
    <Flex align="center">
      <Box mr="4" textAlign="right">
        <Text>José Gabriel</Text>

        <Text color="gray.300" fontSize="small" textAlign="right">
          josegabriel@det.ufc.br
        </Text>
      </Box>

      <Avatar size="md" name="José Gabriel" />
    </Flex>
  );
}
