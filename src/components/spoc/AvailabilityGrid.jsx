import {
  Box,
  Grid,
  GridItem,
  Text,
  useColorModeValue,
  Button,
  VStack,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";

export default function AvailabilityGrid({ slots = [], onSelectSlot }) {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const toast = useToast();

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot.slot_id);
    onSelectSlot(slot);
    toast({
      title: "Slot selected",
      description: `${formatTime(slot.start_time)} - ${formatTime(slot.end_time)}`,
      status: "info",
      duration: 2000,
      isClosable: true,
      position: "top",
    });
  };

  const formatTime = (timeString) => {
    const date = new Date(timeString);
    return date.toLocaleString([], {
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const bgSelected = useColorModeValue("blue.500", "blue.300");
  const bgHover = useColorModeValue("blue.50", "gray.700");
  const bgDefault = useColorModeValue("white", "gray.800");
  const borderDefault = useColorModeValue("gray.200", "gray.600");

  if (!slots || slots.length === 0) {
    return (
      <Box
        w="100%"
        textAlign="center"
        py={10}
        color="gray.500"
        border="1px dashed"
        borderColor="gray.300"
        rounded="md"
      >
        No available slots found for this SPOC.
      </Box>
    );
  }

  return (
    <VStack align="stretch" spacing={4} w="100%">
      <Heading as="h4" size="md" color="gray.700">
        Available Slots
      </Heading>
      <Grid
        templateColumns={{
          base: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gap={4}
      >
        {slots.map((slot) => {
          const isSelected = selectedSlot === slot.slot_id;
          return (
            <GridItem
              key={slot.slot_id}
              as={Button}
              variant="outline"
              bg={isSelected ? bgSelected : bgDefault}
              color={isSelected ? "white" : "gray.700"}
              borderColor={isSelected ? "blue.500" : borderDefault}
              _hover={{ bg: isSelected ? bgSelected : bgHover }}
              onClick={() => handleSlotSelect(slot)}
              p={4}
              rounded="md"
              textAlign="center"
              fontWeight={isSelected ? "bold" : "normal"}
            >
              <Text fontSize="sm">{formatTime(slot.start_time)}</Text>
              <Text fontSize="xs" color={isSelected ? "whiteAlpha.800" : "gray.500"}>
                {new Date(slot.end_time).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
            </GridItem>
          );
        })}
      </Grid>
    </VStack>
  );
}
