import { Flex, Heading, Spacer } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { useAuthStore } from "@/state/accounts";
import UserMenu from "./components/UserMenu/UserMenu";

export const Header = () => {
  const signOut = useAuthStore((s) => s.signOut);
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut();
    navigate(ROUTES.LOGIN);
  };

  return (
    <Flex
      as="header"
      align="center"
      py={2}
      px={6}
      bg="gray.800"
      color="white"
      boxShadow="md"
      position="sticky"
      top={0}
      zIndex={1000}
    >
      <Heading size="md" cursor="pointer" onClick={() => navigate(ROUTES.CHAT)}>
        Chat
      </Heading>

      <Spacer />

      <UserMenu onLogout={handleLogout} />
    </Flex>
  );
};
