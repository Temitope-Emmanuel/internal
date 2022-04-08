import React from "react";
import {
  Box,
  FormControl,
  Input as ChakraInput,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
} from "@chakra-ui/react";

const Input: React.FC<{
  value: string;
  type?: "text" | "password" | "email";
  label: string;
  isRequired?: boolean;
  isInValid?: boolean;
  placeholder?: string;
  setValue: (arg: string) => void;
}> = ({
  placeholder,
  setValue,
  value,
  label,
  type = 'text',
  isRequired = false,
  isInValid = false,
}) => {
  return (
    <Box>
      <FormControl
        variant="floating"
        id="first-name"
        isInvalid={isInValid}
        {...{ isRequired }}
      >
        <ChakraInput
          {...{ placeholder, value, type }}
          onChange={(e) => setValue(e.currentTarget.value)}
        />
        <FormLabel>{label}</FormLabel>
      </FormControl>
    </Box>
  );
};

export default Input;
