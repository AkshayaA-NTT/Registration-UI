import {
  Box,
  Flex,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Avatar,
  Text,
  HStack,
  useColorModeValue,
  Image,
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const bgColor = useColorModeValue("white", "gray.900");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const logoTextColor = useColorModeValue("brand.600", "brand.300");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isAdmin = user?.roles?.some((role) => role.name === "ADMIN");

  return (
    <Box
  w="100%"
  bg={bgColor}
  px={4}
  boxShadow="sm"
  borderBottomWidth="1px"
  borderColor={borderColor}
  position="sticky"
  top={0}
  zIndex={1000}
>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        
        <HStack spacing={8} alignItems="center">
          <HStack
            spacing={3}
            as={RouterLink}
            to="/"
            _hover={{ opacity: 0.8 }}
            transition="opacity 0.2s"
          >
            <Image
              src="/NTT_logo.png" 
              alt="NTT Data Logo"
              height="40px"
              objectFit="contain"
            />
            <Box borderLeft="2px solid" borderColor="gray.300" height="30px" />
            <Text fontSize="xl" fontWeight="bold" color={logoTextColor}>
              Registration
            </Text>
          </HStack>
        </HStack>

        
        <Flex alignItems="center">
          <Menu>
            <MenuButton
              as={Button}
              rounded="full"
              variant="link"
              cursor="pointer"
              minW={0}
            >
              <HStack spacing={2}>
                <Avatar
                  bg="brand.600"
                  color="white"
                  size="sm"
                  name={`${user?.first_name ?? ""} ${user?.last_name ?? ""}`}
                />
                <Text
                  fontSize="sm"
                  display={{ base: "none", md: "block" }}
                  color={useColorModeValue("gray.700", "gray.200")}
                >
                  {user?.first_name} {user?.last_name}
                </Text>
                <FiChevronDown />
              </HStack>
            </MenuButton>

            <MenuList>
              <MenuItem _disabled>
                <Text fontSize="sm" color="gray.600">
                  {user?.email || "No email available"}
                </Text>
              </MenuItem>
              <MenuDivider />
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
