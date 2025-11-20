import {
  Box,
  Heading,
  SimpleGrid,
  useToast,
  Button,
  VStack,
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

  // MOCK MODE 
  const mockMode = true; 
 
  // FETCH SPOCs FILTERED BY SOLUTION TYPE

  useEffect(() => {
    const fetchSpocs = async () => {
      try {
        const res = await getSpocs({
        solution_type: clientData?.solution_type?.toLowerCase(),});
        console.log("Fetched SPOCs:", res);
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

    if (clientData?.solution_type) {
      console.log('calling getSpocs with', clientData?.solution_type);
      fetchSpocs();
    } else {
      setLoading(false);
    }
  }, [clientData?.solution_type, toast]);


  // FETCH AVAILABILITY FOR SELECTED SPOC

  const handleViewAvailability = async (spoc) => {
    setSelectedSpoc(spoc);
    setSelectedSlot(null);

    try {
      const res = await getSpocAvailability(spoc.spoc_id);

      setSlots(res.data?.available_slots || []);
    } catch (err) {
      toast({
        title: "Error loading availability",
        status: "error",
        duration: 2500,
        isClosable: true,
      });
    }
  };

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

  // LOADING SCREEN
  if (loading) return <Loader message="Loading SPOCs..." />;

  return (
    <PageWrapper>
      <StepperHeader activeStep={2} />

      <Heading size="md" mb={6} color="blue.600">
        Select SPOC and Time Slot
      </Heading>

      {/* List of SPOCs */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
        {spocs.map((spoc) => (
          <SpocCard
            key={spoc.spoc_id}
            spoc={spoc}
            onViewAvailability={handleViewAvailability}
            isSelected={selectedSpoc?.spoc_id === spoc.spoc_id}
          />
        ))}
      </SimpleGrid>

      {/* Availability Slots */}
      {selectedSpoc && (
        <Box mt={10}>
          <AvailabilityGrid
            slots={slots}
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
    </PageWrapper>
  );
}
