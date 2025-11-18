import { Flex } from "@chakra-ui/react";

export default function PageWrapper({ children }) {
  return (
    <Flex
      direction="column"
      w="100%"
      minH="calc(100vh - 64px)"   // Full screen minus navbar
      bg="gray.50"
      px={0}
      py={6}                     // vertical padding only
    >
      {children}
    </Flex>
  );
}
