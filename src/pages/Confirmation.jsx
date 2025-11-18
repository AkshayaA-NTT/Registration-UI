import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Divider,
  Button,
  Flex,
  useClipboard,
  useToast,
  Card,
  CardBody,
  CardHeader,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDeal } from "../hooks/useDeal";
import { getBookingDetails } from "../services/bookingService";
import StepperHeader from "../components/layout/StepperHeader";
import PageWrapper from "../components/layout/PageWrapper";
import Loader from "../components/common/loader";

export default function Confirmation() {
  const {
    clientData,
    selectedSpoc,
    selectedSlot,
    bookingId,
    bookingLink,
    setBookingLink,
    clearDealContext,
  } = useDeal();

  const [bookingDetails, setBookingDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const { hasCopied, onCopy } = useClipboard(bookingLink || "");

  // ✅ Fetch booking details from backend
  useEffect(() => {
    const fetchBooking = async () => {
      if (!bookingId) {
        setLoading(false);
        return;
      }
      try {
        const res = await getBookingDetails(bookingId);
        setBookingDetails(res.data);
        if (res.data.meeting_link) setBookingLink(res.data.meeting_link);
      } catch (err) {
        console.error("❌ Failed to fetch booking details:", err);
        toast({
          title: "Failed to load booking details",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchBooking();
  }, [bookingId, setBookingLink, toast]);

  if (loading) return <Loader message="Fetching booking confirmation..." />;

  if (!bookingId) {
    return (
      <Box textAlign="center" mt={20}>
        <Heading size="md" color="gray.600">
          No booking found
        </Heading>
        <Text color="gray.500" mt={2}>
          Please complete the booking process first.
        </Text>
      </Box>
    );
  }

  const booking = bookingDetails || {
    booking_id: bookingId,
    client_id: clientData?.company_name || "N/A",
    spoc_name: selectedSpoc?.name || "N/A",
    slot_start: selectedSlot?.start_time,
    slot_end: selectedSlot?.end_time,
  };

  return (
    <PageWrapper>
      <StepperHeader activeStep={3} />

      <Card shadow="md" borderWidth="1px" borderColor="gray.200" bg="white">
        <CardHeader>
          <Heading size="lg" textAlign="center" color="blue.600">
            Booking Confirmed 🎉
          </Heading>
        </CardHeader>

        <CardBody>
          <VStack spacing={6} align="stretch">
            <Box>
              <Heading size="sm" mb={1} color="gray.700">
                Booking ID
              </Heading>
              <Text fontWeight="medium">{booking.booking_id}</Text>
            </Box>

            <Divider />

            <Box>
              <Heading size="sm" mb={1} color="gray.700">
                Client
              </Heading>
              <Text>{clientData?.company_name || "N/A"}</Text>
            </Box>

            <Box>
              <Heading size="sm" mb={1} color="gray.700">
                SPOC Assigned
              </Heading>
              <Text>{selectedSpoc?.name || booking.spoc_name}</Text>
            </Box>

            <Box>
              <Heading size="sm" mb={1} color="gray.700">
                Meeting Slot
              </Heading>
              {selectedSlot ? (
                <Text>
                  {new Date(selectedSlot.start_time).toLocaleString()} –{" "}
                  {new Date(selectedSlot.end_time).toLocaleTimeString()}
                </Text>
              ) : (
                <Text>{booking.slot_start && new Date(booking.slot_start).toLocaleString()}</Text>
              )}
            </Box>

            <Box>
              <Heading size="sm" mb={1} color="gray.700">
                Meeting Link
              </Heading>
              {bookingLink ? (
                <HStack spacing={3}>
                  <Text color="blue.500" wordBreak="break-all">
                    {bookingLink}
                  </Text>
                  <Button size="sm" onClick={onCopy} colorScheme={hasCopied ? "green" : "blue"}>
                    {hasCopied ? "Copied!" : "Copy Link"}
                  </Button>
                </HStack>
              ) : (
                <Text color="gray.500">No meeting link generated yet.</Text>
              )}
            </Box>
          </VStack>
        </CardBody>
      </Card>

      <VStack spacing={4} mt={8}>
        <Button colorScheme="blue" onClick={clearDealContext}>
          Register New Deal
        </Button>
      </VStack>
      </PageWrapper>
  );

}
