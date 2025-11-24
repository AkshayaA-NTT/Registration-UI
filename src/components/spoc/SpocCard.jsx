import {
  Box,
  Flex,
  Avatar,
  Text,
  Badge,
  Button,
  VStack,
  HStack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";

export default function SpocCard({ spoc, onViewAvailability, isSelected = false }) {
  const toast = useToast();

  const handleViewAvailability = () => {
    onViewAvailability(spoc);
    toast({
      title: "Viewing Availability",
      description: `Fetching slots for ${spoc.name}`,
      status: "info",
      duration: 2000,
      isClosable: true,
      position: "top",
    });
  };

  const bg = useColorModeValue(isSelected ? "blue.50" : "white", isSelected ? "blue.900" : "gray.800");
  const border = useColorModeValue(isSelected ? "blue.400" : "gray.200", isSelected ? "blue.300" : "gray.700");
  const textColor = useColorModeValue("gray.800", "gray.100");

  return (
    <Box
      borderWidth="1px"
      borderColor={border}
      rounded="lg"
      p={5}
      bg={bg}
      shadow={isSelected ? "md" : "sm"}
      transition="all 0.2s ease"
      _hover={{ shadow: "md", transform: "translateY(-2px)" }}
    >
      <Flex align="center" mb={3}>
        <Avatar name={spoc.name} size="md" />
        <VStack align="start" spacing={0} ml={3}>
          <Text fontWeight="semibold" fontSize="md" color={textColor}>
            {spoc.name}
          </Text>
          <Text fontSize="sm" color="gray.500">
            {spoc.email}
          </Text>
        </VStack>
      </Flex>

      {/* Badges in a row but allow wrapping */}
      <HStack spacing={2} flexWrap="wrap">
        <Badge colorScheme="blue" variant="subtle">
          {spoc.expertise || "General"}
        </Badge>

        <Badge colorScheme="purple" variant="subtle">
          {spoc.specialization || "N/A"}
        </Badge>
      </HStack>

      {/* Button moved to separate row to avoid overflow */}
      <Flex justify="flex-end" mt={4}>
        <Button
          size="sm"
          fontSize="xs"
          colorScheme="blue"
          variant={isSelected ? "solid" : "outline"}
          onClick={handleViewAvailability}
        >
          {isSelected ? "Selected" : "View Slots"}
        </Button>
      </Flex>
    </Box>
  );
}
