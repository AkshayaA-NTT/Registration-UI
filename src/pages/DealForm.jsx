import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  Heading,
  useToast,
  Card,
  CardBody,
  SimpleGrid,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createClient } from "../services/clientService";
import { useDeal } from "../hooks/useDeal";
import { useAuth } from "../hooks/useAuth";
import StepperHeader from "../components/layout/StepperHeader";

const SolutionTypes = [
  "Cloud Infrastructure",
  "Security Solutions",
  "Data Analytics",
  "Automation",
  "Custom Solutions",
];

const DealTypes = ['High Budget', 'Mid range', 'Low Budget', 'To be Decided'];

const DealStages = ['Lead', 'POC Stage', 'Discovery', 'Closign stage', 'Others'];

export default function DealForm() {
  const [form, setForm] = useState({
    company_name: "",
    industry: "",
    contact_name: "",
    contact_email: "",
    solution_type: "",
    deal_type: "",
    deal_stage: "",
  });

  const { setClientId, setClientData } = useDeal();
  const navigate = useNavigate();
  const toast = useToast();
  const { token } = useAuth();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createClient(form);

      setClientId(res.data.client_id);
      setClientData({
        ...form,
        solution_type: form.solution_type.trim().toLowerCase(),
      });

      toast({
        title: "Deal created successfully!",
        status: "success",
        duration: 2500,
        isClosable: true,
      });

      navigate("/spoc-selection");
    } catch (err) {
      toast({
        title: "Error creating deal",
        description: "Please check inputs and try again.",
        status: "error",
        duration: 2500,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxW="900px" mx="auto" w="100%">
      <StepperHeader activeStep={1} />

      <Card shadow="md" borderWidth="1px" borderColor="gray.200" mt={6}>
        <CardBody>
          <Heading size="md" mb={6} color="blue.600">
            Deal Creation Form
          </Heading>

          <form onSubmit={handleSubmit}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              {/* LEFT COLUMN */}
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Company Name</FormLabel>
                  <Input
                    name="company_name"
                    placeholder="Enter company name"
                    value={form.company_name}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Industry</FormLabel>
                  <Input
                    name="industry"
                    placeholder="E.g. Healthcare, Finance"
                    value={form.industry}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Contact Name</FormLabel>
                  <Input
                    name="contact_name"
                    placeholder="Enter contact name"
                    value={form.contact_name}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input
                    name="contact_email"
                    type="email"
                    placeholder="Enter email"
                    value={form.contact_email}
                    onChange={handleChange}
                  />
                </FormControl>
              </VStack>

              {/* RIGHT COLUMN */}
              <VStack spacing={4}>
                <FormControl>
                  <FormLabel>Solution Type</FormLabel>
                  <Select
                    name="solution_type"
                    value={form.solution_type}
                    onChange={handleChange}
                  >
                    <option value="">Select Solution Type</option>
                    {SolutionTypes.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel>Deal Type</FormLabel>
                  <Select
                    name="deal_type"
                    value={form.deal_type}
                    onChange={handleChange}
                  >
                    <option value="">Select Deal Type</option>
                    {DealTypes.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel>Deal Stage</FormLabel>
                  <Select
                    name="deal_stage"
                    value={form.deal_stage}
                    onChange={handleChange}
                  >
                    <option value="">Select Deal Stage</option>
                    {DealStages.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </VStack>
            </SimpleGrid>

            <Button type="submit" colorScheme="blue" w="full" mt={6}>
              Next: Assign SPOC
            </Button>
          </form>
        </CardBody>
      </Card>
    </Box>
  );
}
