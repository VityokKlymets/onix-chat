import React, { useEffect, useRef } from "react";
import { useChatStore } from "@/state/chat";
import { Box, Flex, Grid } from "@chakra-ui/react";
import { ChatMessage, ChatNavbar, SystemMessage } from "./components";
import { useAuthStore } from "@/state/accounts";

export const ChatMessages: React.FC = () => {
  const { rooms, currentRoom } = useChatStore();
  const { user } = useAuthStore();
  const messages = rooms[currentRoom]?.messages || [];
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    containerRef.current?.scrollTo({
      top: containerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <Grid height={"100%"} gridTemplateRows={"auto 1fr"}>
      <ChatNavbar />
      <Box
        ref={containerRef}
        flex="1"
        overflowY="auto"
        p={4}
        bg="gray.50"
        rounded="md"
        border="1px solid"
        borderColor="gray.100"
        height={"100%"}
      >
        <Flex flexDirection={"column"} alignItems={"center"} gap={2}>
          {messages.map((msg) =>
            msg.system ? (
              <SystemMessage key={msg.id} content={msg.content} />
            ) : (
              <ChatMessage
                username={msg.user.username}
                content={msg.content}
                timestamp={msg.timestamp}
                key={msg.id}
                isUserMessage={msg.user.username === user?.username}
              />
            )
          )}
        </Flex>
      </Box>
    </Grid>
  );
};
