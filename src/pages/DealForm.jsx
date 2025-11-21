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
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createClient } from "../services/clientService";
import { useDeal } from "../hooks/useDeal";
import { useAuth } from "../hooks/useAuth";
import StepperHeader from "../components/layout/StepperHeader";
import PageWrapper from "../components/layout/PageWrapper";

const SolutionTypes = [
  "Cloud Infrastructure",
  "Security Solutions",
  "Data Analytics",
  "Automation",
  "Custom Solutions",
];

const DealTypes = [
    'High Budget',
    'Mid range',
    'Low Budget',
    'Tobe Decided'
  ];

const DealStages = [
    'Lead',
    'POC Stage',
    'Discovery',
    'Closign stage',
    'Others'
  ];

export default function DealForm() {
  const [form, setForm] = useState({
    company_name: "",
    contact_name: "",
    contact_email: "",
    industry: "",
    solution_type: "",
    deal_type: "",
    deal_stage: "",
  });

  const { setClientId, setClientData } = useDeal();
  const navigate = useNavigate();
  const toast = useToast();
  const {token} = useAuth();
  const { setDealData } = useDeal();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createClient(form);
      setClientId(res.data.client_id);
      setClientData({
        ...form,
        solution_type: form.solution_type.trim().toLowerCase(),  // remove spaces
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
    // <PageWrapper>
      <Box maxW="900px" mx="auto" w="100%">
        <StepperHeader activeStep={1} />

        <Card shadow="md" borderWidth="1px" borderColor="gray.200" mt={6}>
          <CardBody>
            <Heading size="md" mb={6} color="blue.600">
              Deal Creation Form
            </Heading>

            <form onSubmit={handleSubmit}>
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Company Name</FormLabel>
                  <Input
                    name="company_name"
                    placeholder="Enter company name"
                    onChange={handleChange}
                    value={form.company_name}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Contact Name</FormLabel>
                  <Input
                    name="contact_name"
                    placeholder="Enter contact name"
                    onChange={handleChange}
                    value={form.contact_name}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input
                    name="contact_email"
                    type="email"
                    placeholder="Enter email"
                    onChange={handleChange}
                    value={form.contact_email}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Industry</FormLabel>
                  <Input
                    name="industry"
                    placeholder="E.g. Healthcare, Finance"
                    onChange={handleChange}
                    value={form.industry}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Solution Type</FormLabel>
                  <Select
                    name="solution_type"
                    onChange={handleChange}
                    value={form.solution_type}
                  >
                    <option value="">Select Solution type</option>
                    {SolutionTypes.map((s)=>(
                      <option key={s} value = {s}>{s}</option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel>Deal Type</FormLabel>
                  <Select
                    name="deal_type"
                    onChange={handleChange}
                    value={form.deal_type}
                  >
                    <option value="">Select Deal type</option>
                    {DealTypes.map((d)=>(
                      <option key={d} value = {d}>{d}</option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel>Deal Stage</FormLabel>
                  <Select
                    name="deal_stage"
                    onChange={handleChange}
                    value={form.deal_stage}
                  >
                    <option value="">Select Deal Stage</option>
                    {DealStages.map((stage)=>(
                      <option key={stage} value = {stage}>{stage}</option>
                    ))}
                  </Select>
                </FormControl>

                <Button type="submit" colorScheme="blue" w="full" mt={4}>
                  Next: Assign SPOC
                </Button>
              </VStack>
            </form>
          </CardBody>
        </Card>
      </Box>
    // </PageWrapper>
  );
}
