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
    selectedSpoc,
    setSelectedSpoc,
    selectedSlot,
    setSelectedSlot,
    setBookingId,
  } = useDeal();

  const toast = useToast();
  const navigate = useNavigate();


  // MOCK MODE
  // const mockMode = true;

  // Mock SPOCs
  // const mockSpocs = [
  //   {
  //     spoc_id: 1,
  //     name: "John Doe",
  //     role: "Technical SPOC",
  //     email: "john@example.com",
  //   },
  //   {
  //     spoc_id: 2,
  //     name: "Sarah Johnson",
  //     role: "Business SPOC",
  //     email: "sarah@example.com",
  //   },
  //   {
  //     spoc_id: 3,
  //     name: "Michael Smith",
  //     role: "Senior SPOC",
  //     email: "michael@example.com",
  //   },
  // ];

  // // Mock Slots
  // const mockSlots = [
  //   { slot_id: 101, time: "10:00 AM", status: "available" },
  //   { slot_id: 102, time: "11:30 AM", status: "available" },
  //   { slot_id: 103, time: "02:00 PM", status: "available" },
  // ];

  // ===================================================
  // FETCH SPOCS
  // ===================================================
  useEffect(()=>{
    const fetchSpocs = async()=>{
      try{
        const res = await getSpocs();

        setSpocs(res.data || []);
      }
      catch{
        toast({
          title: "Failed to load SPOCs",
          status: "error",
          duration: 2500,
          isClosable: true,
        });
      }finally{
        setLoading(false);
      }
    };
    fetchSpocs();
  },[toast]);

  // VIEW AVAILABILITY

  const handleViewAvailability = async (spoc) => {
    setSelectedSpoc(spoc);
    setSlots([]);
    setSelectedSlot(null);

    try {
      const res = 
      // await
      //   ? { data: { slots: mockSlots } }: 
        await getSpocAvailability(spoc.spoc_id, {
            start_date: "2025-11-12",
            end_date: "2025-11-14",
          });

      setSlots(res.data.slots || []);
    } catch {
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
      const res = 
      // mockMode
        // ? { data: { booking_id: "MOCK12345" } }:
        await createBooking({
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
    } catch {
      toast({
        title: "Failed to confirm booking",
        status: "error",
        duration: 2500,
        isClosable: true,
      });
    }
  };

  if (loading) return <Loader message="Loading SPOCs..." />;

  return (
    <PageWrapper>
    
      <StepperHeader activeStep={2} />

      <Heading size="md" mb={6} color="blue.600">
        Select SPOC and Time Slot
      </Heading>

      {/* SPOC list */}
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

      {/* Slots */}
      {selectedSpoc && (
        <Box mt={10}>
          <AvailabilityGrid
            slots={slots}
            onSelectSlot={(slot) => {
              setSelectedSlot(slot);
            }}
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
