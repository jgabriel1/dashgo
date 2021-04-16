import { forwardRef, ForwardRefRenderFunction } from 'react';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
} from '@chakra-ui/react';

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  error?: string;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, label, error = null, ...rest },
  ref
) => {
  return (
    <FormControl isInvalid={!!error}>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}

      <ChakraInput
        ref={ref}
        name={name}
        id={name}
        size="lg"
        variant="filled"
        bgColor="gray.900"
        _hover={{ bgColor: 'gray.900' }}
        focusBorderColor="pink.500"
        {...rest}
      />

      {!!error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export const Input = forwardRef(InputBase);
