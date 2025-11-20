import {
  Box,
  Grid,
  GridItem,
  Text,
  VStack,
  Heading,
  useToast,
  useColorModeValue,
  Divider,
} from "@chakra-ui/react";
import { useState, useMemo } from "react";

export default function AvailabilityGrid({ slots = [], onSelectSlot }) {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const toast = useToast();

  const bgSelected = useColorModeValue("blue.500", "blue.400");
  const bgHover = useColorModeValue("blue.50", "gray.700");
  const bgDefault = useColorModeValue("white", "gray.800");
  const borderDefault = useColorModeValue("gray.200", "gray.600");

  // Group slots by date (YYYY-MM-DD)
  const groupedSlots = useMemo(() => {
    const map = {};
    slots.forEach((slot) => {
      const date = slot.start_time.split("T")[0];
      if (!map[date]) map[date] = [];
      map[date].push(slot);
    });
    return map;
  }, [slots]);

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot.slot_id);
    onSelectSlot(slot);

    toast({
      title: "Slot selected",
      description: `${formatDate(slot.start_time)} | ${formatTime(slot.start_time)} - ${formatTime(
        slot.end_time
      )}`,
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top",
    });
  };

  const formatTime = (timeString) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString([], {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

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
    <VStack align="stretch" spacing={8} w="100%">
      <Heading size="md" color="blue.700">
        Available Slots
      </Heading>

      {Object.keys(groupedSlots).map((date) => (
        <Box key={date}>
          <Heading size="sm" mb={3} color="gray.600">
            {formatDate(date)}
          </Heading>

          <Grid
            templateColumns={{
              base: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
            }}
            gap={4}
          >
            {groupedSlots[date].map((slot) => {
              const isSelected = selectedSlot === slot.slot_id;

              return (
                <GridItem
                  key={slot.slot_id}
                  bg={isSelected ? bgSelected : bgDefault}
                  border="1px solid"
                  borderColor={isSelected ? "blue.600" : borderDefault}
                  rounded="md"
                  p={4}
                  cursor="pointer"
                  textAlign="center"
                  color={isSelected ? "white" : "gray.700"}
                  _hover={{
                    bg: isSelected ? bgSelected : bgHover,
                  }}
                  onClick={() => handleSlotSelect(slot)}
                >
                  <Text fontSize="md" fontWeight="bold">
                    {formatTime(slot.start_time)}
                  </Text>
                  <Text
                    fontSize="sm"
                    color={isSelected ? "whiteAlpha.800" : "gray.500"}
                  >
                    {formatTime(slot.end_time)}
                  </Text>
                </GridItem>
              );
            })}
          </Grid>

          <Divider mt={5} />
        </Box>
      ))}
    </VStack>
  );
}
