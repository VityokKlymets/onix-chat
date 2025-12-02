import {
  Box,
  Button,
  Input,
  Heading,
  Text,
  VStack,
  Field,
  Spinner,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./schema";
import { useAuthStore } from "@/state/accounts";

type EnterPasswordData = {
  password: string;
};

export const EnterPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EnterPasswordData>({
    resolver: yupResolver(schema),
  });
  const { signIn } = useAuthStore();

  const onSubmit = handleSubmit((data) => {
    signIn(data.password);
  });

  return (
    <form onSubmit={onSubmit}>
      <VStack gap={6} align="stretch">
        <Box textAlign="center">
          <Heading size="lg" mb={2}>
            Sign In
          </Heading>
          <Text color="gray.500">Enter your credentials to continue</Text>
        </Box>
        <Field.Root invalid={!!errors.password}>
          <Field.Label>Password</Field.Label>
          <Input type="password" {...register("password")} />
          {errors.password ? (
            <Field.ErrorText>{errors.password.message}</Field.ErrorText>
          ) : (
            <Field.HelperText>Enter the password</Field.HelperText>
          )}
        </Field.Root>
        <Button type="submit" colorScheme="blue" size="md" mt={2}>
          {isSubmitting ? <Spinner size="sm" /> : "Sign In"}
        </Button>
      </VStack>
    </form>
  );
};
