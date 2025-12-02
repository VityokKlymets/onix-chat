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
import { useUsernameStore } from "@/state/accounts/useUsernameStore";

type SetPasswordData = {
  password: string;
  passwordConfirm: string;
};

export const SetPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SetPasswordData>({
    resolver: yupResolver(schema),
  });
  const { setUserPassword } = useUsernameStore();

  const onSubmit = handleSubmit((data) => {
    setUserPassword(data.password, data.passwordConfirm);
  });

  return (
    <form onSubmit={onSubmit}>
      <VStack gap={6} align="stretch">
        <Box textAlign="center">
          <Heading size="lg" mb={2}>
            Create a password
          </Heading>
          <Text color="gray.500">Set a password for your account</Text>
        </Box>
        <Field.Root invalid={!!errors.password}>
          <Field.Label>Password</Field.Label>
          <Input type="password" {...register("password")} />
          {errors.password ? (
            <Field.ErrorText>{errors.password.message}</Field.ErrorText>
          ) : (
            <Field.HelperText>Set the password</Field.HelperText>
          )}
        </Field.Root>

        <Field.Root invalid={!!errors.passwordConfirm}>
          <Field.Label>Password Confirm</Field.Label>
          <Input type="password" {...register("passwordConfirm")} />
          {errors.password ? (
            <Field.ErrorText>{errors.passwordConfirm?.message}</Field.ErrorText>
          ) : (
            <Field.HelperText>Repeat the password</Field.HelperText>
          )}
        </Field.Root>
        <Button type="submit" colorScheme="blue" size="md" mt={2}>
          {isSubmitting ? <Spinner size="sm" /> : "Sign In"}
        </Button>
      </VStack>
    </form>
  );
};
