import { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  HStack,
  Link,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/layout/PageWrapper";

export default function RegisterPage() {
  const navigate = useNavigate();
  const toast = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
  if (formData.password !== formData.confirmPassword) {
    toast({
      title: "Passwords do not match",
      status: "error",
      duration: 3000,
    });
    return;
  }

  try {
    const response = await axios.post("http://localhost:5000/register", formData); //need backend api for this

    toast({
      title: "Registration successful!",
      description: "You can now log in.",
      status: "success",
      duration: 3000,
    });

    navigate("/Login");
  } catch (error) {
    toast({
      title: "Registration failed",
      description: error.response?.data?.message || "Something went wrong.",
      status: "error",
      duration: 3000,
    });
  }
};


  return (
    <Flex height="100vh" width="100vw">
      {/* LEFT SIDE IMAGE / COLOR BLOCK */}
      <Box
        flex="1"
        bgGradient="linear(to-br, blue.500, purple.600)"
        display={{ base: "none", md: "flex" }}
        alignItems="center"
        justifyContent="center"
        color="white"
        p={12}
      >
        <VStack spacing={6} textAlign="center">
          <Heading size="2xl">Create Your Account</Heading>
          <Text fontSize="lg" opacity={0.9}>
            Join us and get started in just a few minutes.
          </Text>
        </VStack>
      </Box>

      {/* RIGHT SIDE FORM */}
      <Flex
        flex="1"
        alignItems="center"
        justifyContent="center"
        p={8}
        bg="gray.50"
      >
        <Box
          bg="white"
          p={10}
          rounded="2xl"
          shadow="lg"
          width="100%"
          maxW="450px"
        >
          <VStack spacing={5}>
            <Heading size="lg">Register</Heading>

            <FormControl>
              <FormLabel>Full Name</FormLabel>
              <Input
                placeholder="Your Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="email@example.com"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="********"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Confirm Password</FormLabel>
              <Input
                type="password"
                placeholder="********"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </FormControl>

            <Button
              width="100%"
              colorScheme="blue"
              size="lg"
              mt={4}
              onClick={handleRegister}
            >
              Create Account
            </Button>

            <HStack justifyContent="center">
              <Text>Already have an account?</Text>
              <Link
                color="blue.500"
                fontWeight="semibold"
                onClick={() => navigate("/Login")}
              >
                Log in
              </Link>
            </HStack>
          </VStack>
        </Box>
      </Flex>
    </Flex>
  );
}
