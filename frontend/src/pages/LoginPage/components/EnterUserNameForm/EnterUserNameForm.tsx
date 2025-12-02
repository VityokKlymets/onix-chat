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

type UsernameData = {
  username: string;
};

export const EnterUserNameForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UsernameData>({
    resolver: yupResolver(schema),
  });
  const { checkUserName } = useUsernameStore();

  const onSubmit = handleSubmit((data) => checkUserName(data.username));

  return (
    <form onSubmit={onSubmit}>
      <VStack gap={6} align="stretch">
        <Box textAlign="center">
          <Heading size="lg" mb={2}>
            Sign In
          </Heading>
          <Text color="gray.500">Enter your credentials to continue</Text>
        </Box>
        <Field.Root invalid={!!errors.username}>
          <Field.Label>Username</Field.Label>
          <Input {...register("username")} />
          {errors.username ? (
            <Field.ErrorText>{errors.username.message}</Field.ErrorText>
          ) : (
            <Field.HelperText>Enter your account username</Field.HelperText>
          )}
        </Field.Root>
        <Button type="submit" colorScheme="blue" size="md" mt={2}>
          {isSubmitting ? <Spinner size="sm" /> : "Sign In"}
        </Button>
      </VStack>
    </form>
  );
};
