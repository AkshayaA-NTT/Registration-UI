import { Flex, Circle, Text, Divider, useColorModeValue, Container } from "@chakra-ui/react";

export default function StepperHeader({ activeStep = 1 }) {
  const steps = ["Deal Creation", "SPOC Selection", "Confirmation"];

  const activeColor = useColorModeValue("blue.500", "blue.300");
  const inactiveColor = useColorModeValue("gray.300", "gray.600");
  const textActive = useColorModeValue("gray.800", "white");
  const textInactive = useColorModeValue("gray.500", "gray.400");

  return (
    <Container 
      maxW="900px"   // same width as your DealForm container
      px={4} 
      mt={8} 
      mb={10}
      centerContent
    >
      <Flex 
        justify="space-between" 
        align="center" 
        w="100%"
      >
        {steps.map((label, index) => {
          const stepNumber = index + 1;
          const isActive = activeStep === stepNumber;
          const isCompleted = activeStep > stepNumber;

          return (
            <Flex key={label} align="center" flex={index === steps.length - 1 ? "0" : "1"}>
              
              {/* Step + Label */}
              <Flex direction="column" align="center">
                <Circle
                  size="36px"
                  bg={isActive ? activeColor : isCompleted ? activeColor : inactiveColor}
                  color="white"
                  border={isActive ? `3px solid ${activeColor}` : "2px solid transparent"}
                  transition="all 0.3s ease"
                >
                  {isCompleted ? "✓" : stepNumber}
                </Circle>

                <Text
                  mt={2}
                  fontSize="sm"
                  color={isActive || isCompleted ? textActive : textInactive}
                  fontWeight={isActive ? "bold" : "medium"}
                  textAlign="center"
                >
                  {label}
                </Text>
              </Flex>

              {/* Divider between steps */}
              {index < steps.length - 1 && (
                <Divider
                  flex="1"
                  borderColor={isCompleted ? activeColor : inactiveColor}
                  borderWidth="1px"
                  mx={4}
                />
              )}
            </Flex>
          );
        })}
      </Flex>
    </Container>
  );
}
