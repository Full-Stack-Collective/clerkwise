'use client';

import {
  Box,
  ChakraProvider,
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  HStack,
  InputGroup,
  InputLeftAddon,
  Button,
  Flex,
} from '@chakra-ui/react';

export const NewPatient = () => {
  return (
    <ChakraProvider>
      <h2>Patient Information</h2>
      <form>
        <Flex p={4} maxW="md" margin={'auto'} flexDirection="column" gap="4">
          <FormControl>
            <FormLabel htmlFor="firstname">First Name:</FormLabel>
            <Input type="text" name="firstName" id="first Name" isRequired={true} />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="surname">Surname:</FormLabel>
            <Input type="text" name="surname" id="surname" isRequired={true}/>
          </FormControl>

          <FormControl as="fieldset">
            <FormLabel as="legend">Sex:</FormLabel>
            <RadioGroup>
              <HStack spacing={8}>
                <Radio value="female">Female</Radio>
                <Radio value="male">Male</Radio>
              </HStack>
            </RadioGroup>
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="dob">Date of Birth:</FormLabel>
            <Input type="date" name="dob" id="dob" isRequired={true}/>
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="id">ID:</FormLabel>
            <Input type="text" name="id" id="id" />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="phone">Phone:</FormLabel>
            <InputGroup>
              <InputLeftAddon>868</InputLeftAddon>
              <Input type="tel" name="phone" id="phone" />
            </InputGroup>
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="address">Address:</FormLabel>
            <Input type="text" name="address" id="address" />
          </FormControl>

          <Button type="submit" size="lg">
            Submit
          </Button>
        </Flex>
      </form>
    </ChakraProvider>
  );
};
