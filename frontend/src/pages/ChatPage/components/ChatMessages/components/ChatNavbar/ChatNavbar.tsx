import React from "react";
import { Flex, Text, Menu, Avatar, Button, Portal } from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";
import { useChatStore } from "@/state/chat";
import { HiUserGroup } from "react-icons/hi";

export const ChatNavbar: React.FC = () => {
  const { rooms, currentRoom } = useChatStore();
  const users = rooms[currentRoom]?.users || [];

  return (
    <Flex
      as="nav"
      bg="gray.100"
      px={4}
      py={2}
      alignItems="center"
      justifyContent="space-between"
      borderBottom="1px solid"
      borderColor="gray.200"
      position={"sticky"}
    >
      <Text fontSize="lg" fontWeight="bold">
        Chat Room: {currentRoom}
      </Text>

      <Menu.Root>
        <Menu.Trigger aria-label="Users in chat">
          <Button variant="outline" size="xs">
            <HiUserGroup /> Users online ({users.length})
          </Button>
        </Menu.Trigger>
        <Portal>
          <Menu.Positioner>
            <Menu.Content>
              {users.length === 0 ? (
                <Menu.Item value="">No users online</Menu.Item>
              ) : (
                users.map((user) => (
                  <Menu.Item value={user.username} key={user.username}>
                    <Flex alignItems="center" gap={2}>
                      <Avatar.Root size="xs">
                        <FaUser />
                      </Avatar.Root>
                      <Text>{user.username}</Text>
                    </Flex>
                  </Menu.Item>
                ))
              )}
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
    </Flex>
  );
};
