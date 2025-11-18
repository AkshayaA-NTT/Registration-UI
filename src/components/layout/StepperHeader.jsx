import { Flex, Circle, Text, Divider, useColorModeValue } from "@chakra-ui/react";

export default function StepperHeader({ activeStep = 1 }) {

  const steps = ["Deal Creation", "SPOC Selection", "Confirmation"];

  const activeColor = useColorModeValue("blue.500", "blue.300");
  const inactiveColor = useColorModeValue("gray.300", "gray.600");
  const textActive = useColorModeValue("gray.800", "white");
  const textInactive = useColorModeValue("gray.500", "gray.400");

  return (
    <Flex
      justify="space-between"
      align="center"
      w="100%"
      maxW="4xl"
      mx="auto"
      mt={8}
      mb={10}
      px={4}
    >
      {steps.map((label, index) => {
        const stepNumber = index + 1;
        const isActive = activeStep === stepNumber;
        const isCompleted = activeStep > stepNumber;

        return (
          <Flex key={label} align="center" flex="1">
            {/* Step circle */}
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

            
            {index < steps.length - 1 && (
              <Divider
                flex="1"
                borderColor={isCompleted ? activeColor : inactiveColor}
                borderWidth="1px"
                mx={2}
              />
            )}
          </Flex>
        );
      })}
    </Flex>
  );
}
