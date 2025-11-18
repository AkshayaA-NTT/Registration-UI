import { Flex, Spinner, Text, VStack } from "@chakra-ui/react";

const Loader = ({ message = "Loading..." }) => {
  // Static colors (light mode only)
  const spinnerColor = "blue.500";
  const textColor = "gray.600";
  const bgColor = "gray.50";

  return (
    <Flex
      align="center"
      justify="center"
      direction="column"
      minH="80vh"
      bg={bgColor}
      w="full"
    >
      <VStack spacing={4}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color={spinnerColor}
          size="xl"
        />
        <Text
          fontSize="md"
          color={textColor}
          fontWeight="medium"
          textAlign="center"
        >
          {message}
        </Text>
      </VStack>
    </Flex>
  );
};

export default Loader;
