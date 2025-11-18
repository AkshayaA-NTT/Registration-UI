import { Box, Flex, Text, Link, Icon } from "@chakra-ui/react";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <Box bg="gray.50" borderTop="1px solid" borderColor="gray.200" py={4} mt={8}>
      <Flex
        align="center"
        justify="space-between"
        maxW="7xl"
        mx="auto"
        px={{ base: 4, md: 8 }}
        direction={{ base: "column", md: "row" }}
      >
        
        <Text fontSize="sm" color="gray.600" textAlign="center">
          © {new Date().getFullYear()} Deal Registration Platform · All rights reserved
        </Text>

        
        <Flex gap={4} mt={{ base: 3, md: 0 }}>
          <Link
            href="https://linkedin.com"
            isExternal
            aria-label="LinkedIn"
            color="gray.500"
            _hover={{ color: "blue.500" }}
          >
            <Icon as={FaLinkedin} boxSize={5} />
          </Link>
          <Link
            href="https://github.com"
            isExternal
            aria-label="GitHub"
            color="gray.500"
            _hover={{ color: "gray.700" }}
          >
            <Icon as={FaGithub} boxSize={5} />
          </Link>
          <Link
            href="mailto:support@company.com"
            aria-label="Email"
            color="gray.500"
            _hover={{ color: "red.500" }}
          >
            <Icon as={FaEnvelope} boxSize={5} />
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
}
