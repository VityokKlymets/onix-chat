import { Box, Flex } from "@chakra-ui/react";
import { useUsernameStore } from "@/state/accounts";
import {
  EnterPasswordForm,
  EnterUserNameForm,
  SetPasswordForm,
} from "./components";

export const LoginPage = () => {
  const { exists } = useUsernameStore();
  return (
    <Flex minH="100vh" align="center" justify="center">
      <Box rounded="2xl" boxShadow="lg" p={8} w={{ base: "90%", sm: "400px" }}>
        {exists === undefined && <EnterUserNameForm />}
        {exists === true && <EnterPasswordForm />}
        {exists === false && <SetPasswordForm />}
      </Box>
    </Flex>
  );
};
