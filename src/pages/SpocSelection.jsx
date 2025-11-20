import {
  Box,
  Heading,
  SimpleGrid,
  useToast,
  Button,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import SpocCard from "../components/spoc/SpocCard";
import AvailabilityGrid from "../components/spoc/AvailabilityGrid";

import { getSpocs, getSpocAvailability } from "../services/spocService";
import { createBooking } from "../services/bookingService";

import { useDeal } from "../hooks/useDeal";

import StepperHeader from "../components/layout/StepperHeader";
import Loader from "../components/common/loader";
import PageWrapper from "../components/layout/PageWrapper";

export default function SpocSelection() {
  const [spocs, setSpocs] = useState([]);
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedDate, setSelectedDate] = useState(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const {
    clientId,
    clientData,
    selectedSpoc,
    setSelectedSpoc,
    selectedSlot,
    setSelectedSlot,
    setBookingId,
  } = useDeal();

  const toast = useToast();
  const navigate = useNavigate();

  // FETCH SPOCs FILTERED BY SOLUTION TYPE
  useEffect(() => {
    const fetchSpocs = async () => {
      try {
        const res = await getSpocs({
          solution_type: clientData?.solution_type?.toLowerCase(),
        });
        setSpocs(res.data || []);
      } catch (err) {
        toast({
          title: "Failed to load SPOCs",
          status: "error",
          duration: 2500,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    if (clientData?.solution_type) fetchSpocs();
    else setLoading(false);
  }, [clientData?.solution_type, toast]);

  // OPEN CALENDAR WHEN "VIEW SLOTS" IS PRESSED
  const handleViewAvailability = async (spoc) => {
    setSelectedSpoc(spoc);
    setSelectedSlot(null);
    setSelectedDate(null);

    try {
      const res = await getSpocAvailability(spoc.spoc_id);
      setSlots(res.data?.available_slots || []);

      // instead of showing all slots → open calendar
      setIsCalendarOpen(true);
    } catch (err) {
      toast({
        title: "Error loading availability",
        status: "error",
        duration: 2500,
        isClosable: true,
      });
    }
  };

  // FILTER BY SELECTED DATE
  const filteredSlots = selectedDate
    ? slots.filter((slot) => slot.start_time.startsWith(selectedDate))
    : [];

  // CONFIRM BOOKING
  const handleConfirmBooking = async () => {
    if (!clientId || !selectedSpoc || !selectedSlot) {
      toast({
        title: "Missing details",
        description: "Please select a SPOC and a slot.",
        status: "warning",
        duration: 2500,
        isClosable: true,
      });
      return;
    }

    try {
      const res = await createBooking({
        client_id: clientId,
        spoc_id: selectedSpoc.spoc_id,
        slot_id: selectedSlot.slot_id,
        meeting_type: "Virtual",
      });

      setBookingId(res.data.booking_id);
      toast({
        title: "Booking confirmed!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });

      navigate("/confirmation");
    } catch (err) {
      toast({
        title: "Failed to confirm booking",
        status: "error",
        duration: 2500,
        isClosable: true,
      });
    }
  };

  if (loading) return <Loader message="Loading SPOCs..." />;

  // GENERATE 14 VALID DATES
  const validDates = Array.from({ length: 14 }).map((_, index) => {
    const d = new Date();
    d.setDate(d.getDate() + 1 + index);
    return d.toISOString().split("T")[0]; // YYYY-MM-DD
  });

  return (
    <PageWrapper>
      <StepperHeader activeStep={2} />

      <Heading size="md" mb={6} color="blue.600">
        Select SPOC and Time Slot
      </Heading>

      {/* SPOC LIST */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
        {spocs.map((spoc) => (
          <SpocCard
            key={spoc.spoc_id}
            spoc={spoc}
            onViewAvailability={handleViewAvailability} // this opens calendar now
            isSelected={selectedSpoc?.spoc_id === spoc.spoc_id}
          />
        ))}
      </SimpleGrid>

      {/* SELECTED DATE + SLOT GRID */}
      {selectedSpoc && selectedDate && (
        <Box mt={10}>
          <Heading size="sm" mb={4}>
            Showing slots for: {selectedDate}
          </Heading>

          <AvailabilityGrid
            slots={filteredSlots}
            onSelectSlot={(slot) => setSelectedSlot(slot)}
          />

          <VStack mt={6}>
            <Button
              colorScheme="blue"
              size="lg"
              onClick={handleConfirmBooking}
              isDisabled={!selectedSlot}
            >
              Confirm Booking
            </Button>
          </VStack>
        </Box>
      )}

      {/* CALENDAR MODAL (triggered when user clicks "View Slots") */}
      <Modal isOpen={isCalendarOpen} onClose={() => setIsCalendarOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select a Date</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <SimpleGrid columns={6} spacing={2}>
              {/* Show an entire 30-day grid but only 14 days are enabled */}
              {Array.from({ length: 30 }).map((_, index) => {
                const d = new Date();
                d.setDate(d.getDate() + index);
                const dateString = d.toISOString().split("T")[0];

                const isEnabled = validDates.includes(dateString);

                return (
                  <Button
                    key={index}
                    size="sm"
                    onClick={() => {
                      if (isEnabled) {
                        setSelectedDate(dateString);
                        setIsCalendarOpen(false);
                      }
                    }}
                    colorScheme={isEnabled ? "blue" : "gray"}
                    variant={isEnabled ? "solid" : "outline"}
                    opacity={isEnabled ? 1 : 0.4}
                    cursor={isEnabled ? "pointer" : "not-allowed"}
                  >
                    {dateString.slice(5)} {/* Show MM-DD */}
                  </Button>
                );
              })}
            </SimpleGrid>
          </ModalBody>
        </ModalContent>
      </Modal>
    </PageWrapper>
  );
}
