import { useChatStore } from "@/state/chat";
import { Box, Input, Button, HStack } from "@chakra-ui/react";
import React, { useState } from "react";

export const MessageInput: React.FC = () => {
  const [text, setText] = useState("");
  const { sendMessage } = useChatStore();

  const handleSend = () => {
    if (!text.trim()) return;
    sendMessage(text.trim());
    setText("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <Box p={2}>
      <HStack>
        <Input
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <Button colorScheme="teal" onClick={handleSend}>
          Send
        </Button>
      </HStack>
    </Box>
  );
};
