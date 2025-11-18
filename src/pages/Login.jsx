import { useState } from "react";
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  Flex,
  Heading,
  VStack,
  useToast,
  Card,
  CardBody,
  Text,
  Link,
  HStack,
} from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Loader from "../components/common/loader";
import PageWrapper from "../components/layout/PageWrapper";

export default function Login() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const { login, loading } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleChange = (e) =>
    setCredentials({ ...credentials, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(credentials);
      toast({
        title: "Login successful!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      navigate(from, { replace: true });
    } catch {
      toast({
        title: "Login failed",
        description: "Invalid username or password",
        status: "error",
        duration: 2500,
        isClosable: true,
      });
    }
  };

  if (loading) return <Loader message="Authenticating..." />;

  return (
    // <PageWrapper>
      <Flex
      height="100vh"
      width="100vw"
      align="center"
      justify="center"
      bg="gray.50"
      >
      <Card
        w={{ base: "90%", sm: "420px", md: "480px", lg: "520px" }}
        shadow="lg"
        borderRadius="xl"
        p={2}
      >
        <CardBody>
          <Heading
            mb={6}
            size="lg"
            textAlign="center"
            color="blue.600"
            fontWeight="bold"
          >
            Deal Registration Login
          </Heading>

          <form onSubmit={handleSubmit}>
            <VStack spacing={5}>
              <FormControl isRequired>
                <FormLabel fontWeight="medium">Username</FormLabel>
                <Input
                  name="username"
                  placeholder="Enter username"
                  value={credentials.username}
                  onChange={handleChange}
                  size="lg"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel fontWeight="medium">Password</FormLabel>
                <Input
                  name="password"
                  type="password"
                  placeholder="Enter password"
                  value={credentials.password}
                  onChange={handleChange}
                  size="lg"
                />
              </FormControl>

              <Button colorScheme="blue" w="full" size="lg" type="submit">
                Login
              </Button>
            </VStack>
          </form>

          <HStack justifyContent="center" mt={6}>
            <Text fontSize="sm" color="gray.600">
              Don’t have an account?
            </Text>
            <Link
              color="blue.600"
              fontWeight="semibold"
              fontSize="sm"
              cursor="pointer"
              onClick={() => navigate("/Registration")}
            >
              Register
            </Link>
          </HStack>

          <Text textAlign="center" fontSize="sm" mt={6} color="gray.500">
            © {new Date().getFullYear()} Deal Registration Platform
          </Text>
        </CardBody>
      </Card>
      </Flex>
  );
}
